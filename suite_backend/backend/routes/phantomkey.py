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

# -------------------------
# Redis helpers (persistence)
# -------------------------
def _pk_key(tracking_id: str) -> str:
    return f"pk:{tracking_id}"

EVENTS_KEY = "pkevents"      # list of recent events (LPUSH newest)
EVENTS_MAX = 2000            # keep up to 2k events

def _r():
    r = current_app.config.get("r")
    if not r:
        raise RuntimeError("Redis is not configured (REDIS_URL missing)")
    return r

def _save_pk(tracking_id: str, data: dict, ttl_seconds: int | None):
    """Save a phantom key hash and apply TTL if provided."""
    r = _r()
    mapping = {
        "used": int(data.get("used", 0)),
        "max_uses": int(data.get("max_uses", 1)),
        "expires_at": int(data.get("expires_at", 0)) if data.get("expires_at") else 0,
        "skeleton": json.dumps(data.get("skeleton", {})),
        "webhook_url": data.get("webhook_url") or "",
    }
    r.hset(_pk_key(tracking_id), mapping=mapping)
    if ttl_seconds and ttl_seconds > 0:
        r.expire(_pk_key(tracking_id), ttl_seconds)

def _get_pk(tracking_id: str) -> dict | None:
    r = _r()
    h = r.hgetall(_pk_key(tracking_id))
    if not h:
        return None
    return {
        "used": int(h.get("used", 0)),
        "max_uses": int(h.get("max_uses", 1)),
        "expires_at": int(h.get("expires_at", 0)) or None,
        "skeleton": json.loads(h.get("skeleton") or "{}"),
        "webhook_url": h.get("webhook_url") or "",
    }

def _incr_used(tracking_id: str) -> int:
    """Increase 'used' counter (not fully atomic vs max_uses; OK for MVP)."""
    r = _r()
    return int(r.hincrby(_pk_key(tracking_id), "used", 1))

def _append_event(evt: dict):
    r = _r()
    r.lpush(EVENTS_KEY, json.dumps(evt))
    r.ltrim(EVENTS_KEY, 0, EVENTS_MAX - 1)

def _get_events(limit: int = 200) -> list[dict]:
    r = _r()
    raw = r.lrange(EVENTS_KEY, 0, max(0, limit - 1))
    out = []
    for s in raw:
        try:
            out.append(json.loads(s))
        except Exception:
            pass
    return out

# -------------------------
# Routes
# -------------------------

@phantomkey_bp.route("/phantomkey/start", methods=["POST"])
def start_phantomkey():
    """
    Body example:
    {
      "fake_skeletons": ["aws","github","ssh"] | [{"type":"aws"}, ...],
      "webhook_url": "https://example.com/hook",
      "ttl_seconds": 86400,
      "max_uses": 1
    }
    """
    cfg = request.get_json(silent=True) or {}

    # Accept both ["aws", ...] and [{"type":"aws"}, ...]
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
    for skeleton in generated:
        tracking_id = str(uuid.uuid4())
        skeleton["tracking_bit"] = tracking_id
        skeleton["canary_url"] = f"/api/phantomkey/track/{tracking_id}"
        skeleton["created_at"] = time.strftime("%Y-%m-%dT%H:%M:%S.%fZ", time.gmtime(now))

        _save_pk(
            tracking_id,
            {
                "used": 0,
                "max_uses": max_uses,
                "expires_at": expires_at,
                "skeleton": skeleton,
                "webhook_url": webhook_url,
            },
            ttl_seconds=ttl_seconds if ttl_seconds > 0 else None,
        )
        tracked.append(skeleton)

    return jsonify({"status": "PhantomKey started", "generated": tracked}), 200


@phantomkey_bp.route("/phantomkey/track/<tracking_id>", methods=["GET", "POST"])
def track_phantomkey(tracking_id):
    entry = _get_pk(tracking_id)
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

    # increment 'used'
    new_used = _incr_used(tracking_id)

    # record event for dashboard/logs
    try:
        ip = request.headers.get("X-Forwarded-For", request.remote_addr)
        if isinstance(ip, str) and "," in ip:
            ip = ip.split(",")[0].strip()
    except Exception:
        ip = None

    evt = {
        "event": "phantomkey.bit_triggered",
        "tracking_id": tracking_id,
        "skeleton": entry.get("skeleton", {}),
        "used": new_used,
        "max_uses": max_uses,
        "ts": now,
        "ip": ip,
        "created_at": entry.get("skeleton", {}).get("created_at"),
    }
    _append_event(evt)

    # fire signed webhook if configured
    webhook_url = entry.get("webhook_url")
    if webhook_url:
        payload = {
            "event": "phantomkey.bit_triggered",
            "tracking_id": tracking_id,
            "skeleton": entry.get("skeleton", {}),
            "used": new_used,
            "max_uses": max_uses,
            "ts": now,
            "created_at": entry.get("skeleton", {}).get("created_at"),
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

    print(f"[PHANTOMKEY] bit {tracking_id} triggered (use {new_used}/{max_uses})")
    return jsonify({
        "status": "bit triggered",
        "tracking_id": tracking_id,
        "used": new_used,
        "max_uses": max_uses
    }), 200


@phantomkey_bp.route("/phantomkey/status/<tracking_id>", methods=["GET"])
def phantom_status(tracking_id):
    entry = _get_pk(tracking_id)
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
    try:
        limit = int(request.args.get("limit", 200))
    except Exception:
        limit = 200
    events = _get_events(limit)
    return jsonify({"events": events, "count": len(events)}), 200
