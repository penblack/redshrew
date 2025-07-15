import os
import random
from datetime import datetime
import requests

FAKE_SKELETON_DIR = "fake_skeletons"
SKELETON_TEMPLATES = {
    "aws": "AKIA{random}FAKE",
    "github": "ghp_{random}",
    "stripe": "sk_live_{random}",
    "ssh": "ssh-rsa AAAAB3NzaC1yc2EAAAADAQABAAABAQD{random}"
}

def generate_random_string(length=24):
    return ''.join(random.choices("ABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789", k=length))

def generate_fake_skeletons(skeleton_types, webhook_url=None):
    skeletons = []
    for s in skeleton_types:
        skel_type = s.get("type")
        template = SKELETON_TEMPLATES.get(skel_type)
        if not template:
            continue
        skeleton_value = template.replace("{random}", generate_random_string())
        filename = f"{skel_type}_skeleton.txt"
        filepath = os.path.join(FAKE_SKELETON_DIR, filename)
        os.makedirs(FAKE_SKELETON_DIR, exist_ok=True)
        with open(filepath, "w") as f:
            f.write(skeleton_value)
        skeletons.append({
            "type": skel_type,
            "value": skeleton_value,
            "filename": filename,
            "created_at": datetime.utcnow().isoformat() + "Z"
        })

    # Webhook on creation
    if webhook_url:
        try:
            requests.post(webhook_url, json={
                "tool": "phantomkey",
                "timestamp": datetime.utcnow().isoformat() + "Z",
                "action": "generate_skeletons",
                "status": "success",
                "skeletons_generated": [s["type"] for s in skeletons]
            })
        except Exception as e:
            print("[ERROR] Webhook failed on creation:", str(e))

    return skeletons
