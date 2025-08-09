import os
import random
from datetime import datetime
import requests

# Optional: log to Observer if present
try:
    from backend.services.observer import log_event, LOG_FILE as _OBS_LOG
except Exception:
    log_event = None  # observer is optional

# Resolve to: <repo>/suite_backend/backend/fake_skeletons
BASE_DIR = os.path.dirname(os.path.dirname(__file__))          # .../backend
FAKE_SKELETON_DIR = os.path.join(BASE_DIR, "fake_skeletons")

SKELETON_TEMPLATES = {
    "aws":    "AKIA{random}FAKE",
    "github": "ghp_{random}",
    "stripe": "sk_live_{random}",
    "ssh":    "ssh-rsa AAAAB3NzaC1yc2EAAAADAQABAAABAQD{random}",
}

def generate_random_string(length: int = 24) -> str:
    alphabet = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789"
    return "".join(random.choices(alphabet, k=length))

def _normalize_types(skeleton_types):
    """
    Allow: ["aws", "github"] OR [{"type":"aws"}, {"type":"github"}]
    """
    normalized = []
    for item in skeleton_types or []:
        if isinstance(item, str):
            normalized.append(item.strip())
        elif isinstance(item, dict):
            t = item.get("type")
            if isinstance(t, str):
                normalized.append(t.strip())
    return normalized

def generate_fake_skeletons(skeleton_types, webhook_url: str | None = None):
    os.makedirs(FAKE_SKELETON_DIR, exist_ok=True)

    types = _normalize_types(skeleton_types)
    skeletons = []

    for skel_type in types:
        template = SKELETON_TEMPLATES.get(skel_type)
        if not template:
            # Unknown type -> skip gracefully
            continue

        token = generate_random_string()
        skeleton_value = template.replace("{random}", token)

        filename = f"{skel_type}_skeleton.txt"
        filepath = os.path.join(FAKE_SKELETON_DIR, filename)

        # Write decoy content
        with open(filepath, "w", encoding="utf-8") as f:
            f.write(skeleton_value)

        payload = {
            "type": skel_type,
            "value": skeleton_value,
            "filename": filename,
            "path": filepath,
            "created_at": datetime.utcnow().isoformat() + "Z",
        }
        skeletons.append(payload)

    # Optional: log to Observer
    if log_event:
        try:
            log_event("phantomkey", "generate_skeletons", "ok", {
                "count": len(skeletons),
                "types": [s["type"] for s in skeletons],
                "dir": FAKE_SKELETON_DIR,
            })
        except Exception as e:
            print(f"[phantomkey] observer log failed: {e}")

    # Optional webhook on creation
    if webhook_url:
        try:
            requests.post(webhook_url, json={
                "tool": "phantomkey",
                "timestamp": datetime.utcnow().isoformat() + "Z",
                "action": "generate_skeletons",
                "status": "success",
                "count": len(skeletons),
                "types": [s["type"] for s in skeletons],
            }, timeout=4)
        except Exception as e:
            print("[phantomkey] Webhook failed on creation:", str(e))

    return skeletons
