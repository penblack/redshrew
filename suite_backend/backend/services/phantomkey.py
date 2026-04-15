import os
import secrets
from datetime import datetime
import requests

# Optional: log to Observer if present
try:
    from backend.services.observer import log_event
except Exception:
    log_event = None  # observer is optional

# Resolve to: <repo>/suite_backend/backend/fake_skeletons
BASE_DIR = os.path.dirname(os.path.dirname(__file__))          # .../backend
FAKE_SKELETON_DIR = os.path.join(BASE_DIR, "fake_skeletons")

# ---------------------------------------------------------------------------
# Realistic token formats — each matches the real-world credential format so
# the key is indistinguishable from an authentic credential to an attacker.
#
# DNS Canary Extension (future hardening):
#   Token values can additionally encode a subdomain of a DNS canary server,
#   e.g. <tracking_id_b32>.dns.redshrew.com. Because RedShrew controls the
#   authoritative NS for that zone, *any DNS lookup* — even a port scan or
#   nslookup — fires the alert before a TCP connection is established. This
#   is the same technique used by Canarytokens.org (subdomain tokens) and
#   Thinkst Canary hardware devices. The HTTP-based /v1/verify endpoint below
#   is the first detection layer; DNS is the zero-day layer.
# ---------------------------------------------------------------------------
_UPPER_ALNUM = "ABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789"
_MIXED_ALNUM = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789"

TOKEN_FORMATS: dict[str, dict] = {
    # AWS Access Key ID: "AKIA" + 16 uppercase alphanumeric = 20 chars
    # Matches the real format exactly (IAM user keys start with AKIA).
    "aws": {
        "prefix": "AKIA",
        "length": 16,
        "charset": _UPPER_ALNUM,
    },
    # GitHub Personal Access Token: "ghp_" + 36 mixed = 40 chars
    "github": {
        "prefix": "ghp_",
        "length": 36,
        "charset": _MIXED_ALNUM,
    },
    # Stripe Secret Key: "sk_live_" + 24 mixed = 32 chars
    "stripe": {
        "prefix": "sk_live_",
        "length": 24,
        "charset": _MIXED_ALNUM,
    },
    # SSH / generic phantomkey: "pk_live_" + 32 mixed = 40 chars
    # Looks like an internal API credential rather than a raw key blob.
    "ssh": {
        "prefix": "pk_live_",
        "length": 32,
        "charset": _MIXED_ALNUM,
    },
}

_DEFAULT_FORMAT = {
    "prefix": "pk_live_",
    "length": 32,
    "charset": _MIXED_ALNUM,
}


def generate_token(skel_type: str) -> str:
    """
    Return a realistic-looking API token for the given skeleton type.
    Uses secrets.choice (CSPRNG) — random.choices is not appropriate for
    tokens that need to be unguessable.
    """
    fmt = TOKEN_FORMATS.get(skel_type, _DEFAULT_FORMAT)
    suffix = "".join(secrets.choice(fmt["charset"]) for _ in range(fmt["length"]))
    return fmt["prefix"] + suffix


def _normalize_types(skeleton_types):
    """
    Accept: ["aws", "github"] OR [{"type":"aws"}, {"type":"github"}]
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


def generate_fake_skeletons(skeleton_types, webhook_url: str | None = None) -> list[dict]:
    """
    Generate PhantomKey tokens.

    Returns a list of skeleton dicts, each containing:
      - type      : the skeleton category (aws, github, etc.)
      - token     : the realistic-looking credential string (shown to user)
      - created_at: ISO-8601 UTC timestamp

    Intentionally does NOT include canary_url or tracking_bit — those are
    internal identifiers assigned by the route layer and must never be
    visible to the end user (they would immediately identify it as a trap).
    """
    os.makedirs(FAKE_SKELETON_DIR, exist_ok=True)
    types = _normalize_types(skeleton_types)
    skeletons = []

    for skel_type in types:
        token = generate_token(skel_type)
        skeletons.append({
            "type": skel_type,
            "token": token,
            "created_at": datetime.utcnow().isoformat() + "Z",
        })

    if log_event:
        try:
            log_event("phantomkey", "generate_skeletons", "ok", {
                "count": len(skeletons),
                "types": [s["type"] for s in skeletons],
            })
        except Exception as e:
            print(f"[phantomkey] observer log failed: {e}")

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
