# backend/routes/phantomkey.py
from flask import Blueprint, request, jsonify, current_app
import os
import hmac
import hashlib
import time
import json
import uuid
import requests

from backend.services.phantomkey import generate_fake_skeletons

phantomkey_bp = Blueprint("phantomkey", __name__)

# Secret used to sign outbound webhooks
WEBHOOK_SECRET = os.environ.get("PHANTOMKEY_WEBHOOK_SECRET", "")

def _sign(body: bytes) -> str:
    """Return 'sha256=<hex>' signature for webhook payloads (empty if no secret)."""
    if not WEBHOOK_SECRET:
        return ""
    mac = hmac.new(WEBHOOK_SECRET.encode("utf-8"), body, hashlib.sha256).hexdigest()
    return f"sha256={mac}"

@phantomkey_bp.before_app_request
def ensure_tracking_store():
    # in-memory store: { tracking_id: {used, max_uses, expires_at, skeleton, webhook_url} }
    if not hasattr(current_app, "phantomkey_tracking"):
        current_app.phantomkey_tracking = {}

@phantomkey_bp.route("/phantomkey/start", methods=["POST"])
def start_phantomkey():
    """
    Body example:
    {
      "fake_skeletons": ["aws","github","ssh"],   // or [{ "type": "aws" }, ...]
      "webhook_url": "https://example.com/hook",
      "ttl_seconds": 86400,                       // default 24h
      "max_uses": 1                               // default 1 (one-time)
    }
    """
    cfg = request.get_json(silent=True) or {}

    # accept both ["aws", ...] and [{"type":"aws"}, ...]
    raw_types = cfg.get("fake_skeletons", [])
    skeleton_types = [
        t if isinstance(t, str) else (t.get("type") if isinstance(t, dict) else None)
        for t in raw_types
    ]
    skeleton_types = [t for t in skeleton_types if t]

    webhook_url = cfg.get("webhook_url")
    ttl_seconds = int(cfg.get("ttl_seconds", 24 * 3600))  # 24h default
    max_uses = max(1, int(cfg.get("max_uses", 1)))        # at least once

    # Generate locally; we'll send our own signed webhook when bits fire
    generated = generate_fake_skeletons(skeleton_types, webhook_url=None)

    now = int(time.time())
    expires_at = now + ttl_seconds if ttl_seconds > 0 else None

    tracked = []
    store = current_app.phantomkey_tracking
    for skeleton in generated:
        tracking_id = str(uuid.uuid4())
        skeleton["tracking_bit"] = tracking_id
        skeleton["canary_url"] = f"/api/phantomkey/track/{tracking_id}"

        store[tracking_id] = {
            "used": 0,
            "max_uses": max_uses,
            "expires_at": expires_at,
            "skeleton": skeleton,
            "webhook_url": webhook_url,
        }
        tracked.append(skeleton)

    return jsonify({"status": "PhantomKey started", "generated": tracked}), 200

@phantomkey_bp.route("/phantomkey/track/<tracking_id>", methods=["GET", "POST"])
def track_phantomkey(tracking_id):
    store = getattr(current_app, "phantomkey_tracking", {})
    entry = store.get(tracking_id)
    if not entry:
        return jsonify({"status": "not found"}), 404

    now = int(time.time())
    expires_at = entry.get("expires_at")
    if expires_at and now > expires_at:
        return jsonify({"status": "expired"}), 410

    used = int(entry.get("used", 0))
    max_uses = int(entry.get("max_uses", 1))
    if used >= max_uses:
        return jsonify({"status": "consumed"}), 409

    # mark use
    entry["used"] = used + 1

    # fire signed webhook if configured
    webhook_url = entry.get("webhook_url")
    if webhook_url:
        payload = {
            "event": "phantomkey.bit_triggered",
            "tracking_id": tracking_id,
            "skeleton": entry.get("skeleton", {}),
            "used": entry["used"],
            "max_uses": max_uses,
            "ts": now,
        }
        body = json.dumps(payload).encode("utf-8")
        headers = {"Content-Type": "application/json"}
        sig = _sign(body)
        if sig:
            headers["X-RedShrew-Signature"] = sig
        try:
            requests.post(webhook_url, data=body, headers=headers, timeout=5)
        except Exception as e:
            # keep serving even if webhook destination fails
            print(f"[PHANTOMKEY] Webhook notification failed: {e}")

    print(f"[PHANTOMKEY] bit {tracking_id} triggered (use {entry['used']}/{max_uses})")
    return jsonify({
        "status": "bit triggered",
        "tracking_id": tracking_id,
        "used": entry["used"],
        "max_uses": max_uses
    }), 200
