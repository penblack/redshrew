# backend/routes/phantomkey.py
from flask import Blueprint, request, jsonify, current_app
from collections import deque
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

    # ---- NEW: record event for dashboard/logs ----
    try:
        ip = request.headers.get("X-Forwarded-For", request.remote_addr)
        # if multiple IPs (proxy list), take first
        if isinstance(ip, str) and "," in ip:
            ip = ip.split(",")[0].strip()
    except Exception:
        ip = None

    evt = {
        "event": "phantomkey.bit_triggered",
        "tracking_id": tracking_id,
        "skeleton": entry.get("skeleton", {}),
        "used": entry["used"],
        "max_uses": max_uses,
        "ts": now,
        "ip": ip,
    }
    try:
        current_app.phantomkey_events.append(evt)
    except Exception as _:
        pass
    # ---- END NEW ----

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
    
@phantomkey_bp.route("/phantomkey/status/<tracking_id>", methods=["GET"])
def phantom_status(tracking_id):
    store = getattr(current_app, "phantomkey_tracking", {})
    entry = store.get(tracking_id)
    if not entry:
        return jsonify({"status": "not found"}), 404

    now = int(time.time())
    expires_at = entry.get("expires_at")
    ttl_left = max(0, (expires_at - now)) if expires_at else None
    remaining = max(0, int(entry.get("max_uses", 1)) - int(entry.get("used", 0)))

    return jsonify({
        "status": "ok",
        "tracking_id": tracking_id,
        "used": int(entry.get("used", 0)),
        "max_uses": int(entry.get("max_uses", 1)),
        "expires_at": expires_at,
        "ttl_seconds_left": ttl_left,
        "remaining_uses": remaining,
        "skeleton": entry.get("skeleton", {}),
    }), 200


@phantomkey_bp.route("/phantomkey/logs", methods=["GET"])
def phantom_logs():
    # optional ?limit=200
    try:
        limit = int(request.args.get("limit", 200))
    except Exception:
        limit = 200
    events = list(getattr(current_app, "phantomkey_events", []))[-limit:]
    return jsonify({"events": events, "count": len(events)}), 200

