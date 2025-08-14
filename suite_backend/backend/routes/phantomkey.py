# backend/routes/phantomkey.py
from flask import Blueprint, request, jsonify, current_app
from collections import deque
from datetime import datetime
import os
import hmac
import hashlib
import time
import json
import uuid
import base64
import requests

from redis.exceptions import RedisError
from backend.services.phantomkey import generate_fake_skeletons

phantomkey_bp = Blueprint("phantomkey", __name__)


# --------------------------------------------------------------------------------------
# App-scoped in-memory stores (used initially and as Redis fallback)
# --------------------------------------------------------------------------------------
@phantomkey_bp.before_app_request
def _ensure_tracking_store():
    if not hasattr(current_app, "phantomkey_tracking"):
        current_app.phantomkey_tracking = {}
    if not hasattr(current_app, "phantomkey_events"):
        current_app.phantomkey_events = deque(maxlen=500)


# --------------------------------------------------------------------------------------
# Outbound webhook signing
# --------------------------------------------------------------------------------------
WEBHOOK_SECRET = os.environ.get("PHANTOMKEY_WEBHOOK_SECRET", "")

def _sign(body: bytes) -> str:
    """Return 'sha256=<hex>' signature for webhook payloads (empty if no secret)."""
    if not WEBHOOK_SECRET:
        return ""
    mac = hmac.new(WEBHOOK_SECRET.encode("utf-8"), body, hashlib.sha256).hexdigest()
    return f"sha256={mac}"


# --------------------------------------------------------------------------------------
# Masked/“native-looking” beacon configuration
# --------------------------------------------------------------------------------------
# Set these in your environment to enable masked URLs:
#   MASKED_COLLECTOR_BASE = e.g. "https://collector.redshrew.com" or "https://telemetry.infra.acme.corp"
#   MASKED_RID_SECRET     = long random string used to HMAC the rid
MASKED_COLLECTOR_BASE = os.getenv("MASKED_COLLECTOR_BASE", "").rstrip("/")
MASKED_RID_SECRET = os.getenv("MASKED_RID_SECRET", "")

def _issue_rid(tracking_id: str, ttl_seconds: int | None) -> str:
    """
    Create an opaque, URL-safe rid that encodes (tracking_id, iat, exp) with an optional HMAC-SHA256.
    Format: base64url(json) + "." + base64url(hmac)   (second part omitted if no secret provided)
    """
    now = int(time.time())
    exp = (now + int(ttl_seconds)) if ttl_seconds and ttl_seconds > 0 else None
    payload = {"tid": tracking_id, "iat": now, "exp": exp}
    body = json.dumps(payload, separators=(",", ":"), sort_keys=True).encode("utf-8")
    mac = hmac.new(MASKED_RID_SECRET.encode("utf-8"), body, hashlib.sha256).digest() if MASKED_RID_SECRET else b""
    p1 = base64.urlsafe_b64encode(body).rstrip(b"=").decode("ascii")
    if mac:
        p2 = base64.urlsafe_b64encode(mac).rstrip(b"=").decode("ascii")
        return f"{p1}.{p2}"
    return p1


# --------------------------------------------------------------------------------------
# Redis helpers (persistence) with graceful fallback
# current_app.config["r"] should be set in your app factory using REDIS_URL (Valkey/Redis)
# --------------------------------------------------------------------------------------
def _pk_key(tracking_id: str) -> str:
    return f"pk:{tracking_id}"

EVENTS_KEY = "pkevents"   # list of recent events (LPUSH newest)
EVENTS_MAX = 2000         # keep up to 2k events

def _r():
    # Returns the live Redis client or None if not configured/disabled.
    return current_app.config.get("r")

def _disable_redis(e: Exception):
    # If Redis errors (allowlist, timeout, etc.), drop to in-memory so UI keeps working.
    print(f"[redis] disabling redis client due to error: {e!r}")
    current_app.config["r"] = None

def _save_pk(tracking_id: str, data: dict, ttl_seconds: int | None):
    """Save a phantom key hash and apply TTL if provided."""
    r = _r()
    if not r:
        # In-memory fallback
        current_app.phantomkey_tracking[tracking_id] = data
        return
    try:
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
    except RedisError as e:
        _disable_redis(e)
        current_app.phantomkey_tracking[tracking_id] = data

def _get_pk(tracking_id: str) -> dict | None:
    r = _r()
    if not r:
        return current_app.phantomkey_tracking.get(tracking_id)
    try:
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
    except RedisError as e:
        _disable_redis(e)
        return current_app.phantomkey_tracking.get(tracking_id)

def _incr_used(tracking_id: str) -> int:
    """Increase 'used' counter (not fully atomic vs max_uses; OK for MVP)."""
    r = _r()
    if not r:
        d = current_app.phantomkey_tracking.get(tracking_id)
        if not d:
            return 0
        d["used"] = int(d.get("used", 0)) + 1
        return d["used"]
    try:
        return int(r.hincrby(_pk_key(tracking_id), "used", 1))
    except RedisError as e:
        _disable_redis(e)
        d = current_app.phantomkey_tracking.get(tracking_id)
        if not d:
            return 0
        d["used"] = int(d.get("used", 0)) + 1
        return d["used"]

def _append_event(evt: dict):
    r = _r()
    if not r:
        try:
            current_app.phantomkey_events.append(evt)
        except Exception:
            pass
        return
    try:
        r.lpush(EVENTS_KEY, json.dumps(evt))
        r.ltrim(EVENTS_KEY, 0, EVENTS_MAX - 1)
    except RedisError as e:
        _disable_redis(e)
        try:
            current_app.phantomkey_events.append(evt)
        except Exception:
            pass

def _get_events(limit: int = 200) -> list[dict]:
    r = _r()
    if not r:
        return list(current_app.phantomkey_events)[-limit:]
    try:
        raw = r.lrange(EVENTS_KEY, 0, max(0, limit - 1))
        out: list[dict] = []
        for s in raw:
            try:
                out.append(json.loads(s))
            except Exception:
                pass
        return out
    except RedisError as e:
        _disable_redis(e)
        return list(current_app.phantomkey_events)[-limit:]


# --------------------------------------------------------------------------------------
# Routes
# --------------------------------------------------------------------------------------
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
        skeleton["created_at"] = datetime.utcfromtimestamp(now).strftime("%Y-%m-%dT%H:%M:%S.%fZ")

        # Optional masked/“native” beacon that blends in with customer naming
        if MASKED_COLLECTOR_BASE:
            rid = _issue_rid(tracking_id, ttl_seconds)
            # Example carrier that looks like a tiny pixel or internal metrics hit
            skeleton["masked_url"] = f"{MASKED_COLLECTOR_BASE}/api/pixel.gif?rid={rid}"
            # If you prefer header-carried ids, you could also expose suggested headers:
            # skeleton["masked_headers"] = {"X-Request-Sig": rid}

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
# ---------- OPTIONAL masked pixel (append to end of file) ----------
from flask import send_file
import io
def _parse_rid(rid: str) -> dict | None:
    """Validate & decode the opaque rid we issued in _issue_rid()."""
    if not rid:
        return None
    try:
        if "." in rid and MASKED_RID_SECRET:
            p1, p2 = rid.split(".", 1)
            body = base64.urlsafe_b64decode(p1 + "===")
            mac = base64.urlsafe_b64decode(p2 + "===")
            expect = hmac.new(MASKED_RID_SECRET.encode("utf-8"), body, hashlib.sha256).digest()
            if not hmac.compare_digest(mac, expect):
                return None
        else:
            body = base64.urlsafe_b64decode(rid + "===")
        payload = json.loads(body.decode("utf-8"))
        # exp check (if present)
        if payload.get("exp") and int(time.time()) > int(payload["exp"]):
            return None
        return payload
    except Exception:
        return None

# 1x1 GIF bytes
_GIF_1PX = (
    b"GIF89a\x01\x00\x01\x00\x80\x00\x00\x00\x00\x00\xff\xff\xff!"
    b"\xf9\x04\x01\x00\x00\x00\x00,\x00\x00\x00\x00\x01\x00\x01"
    b"\x00\x00\x02\x02D\x01\x00;"
)

@phantomkey_bp.route("/pixel.gif", methods=["GET"])
def pixel():
    rid = request.args.get("rid", "")
    payload = _parse_rid(rid)
    if not payload:
        # still serve a pixel to avoid looking suspicious
        return send_file(io.BytesIO(_GIF_1PX), mimetype="image/gif")

    tid = payload.get("tid")
    entry = _get_pk(tid) if tid else None

    try:
        ip = request.headers.get("X-Forwarded-For", request.remote_addr)
        if isinstance(ip, str) and "," in ip:
            ip = ip.split(",")[0].strip()
    except Exception:
        ip = None

    evt = {
        "event": "phantomkey.masked_hit",
        "tracking_id": tid,
        "skeleton": (entry or {}).get("skeleton", {}),
        "ts": int(time.time()),
        "ip": ip,
        "rid_iat": payload.get("iat"),
        "rid_exp": payload.get("exp"),
    }
    _append_event(evt)

    return send_file(io.BytesIO(_GIF_1PX), mimetype="image/gif")
# ---------- END masked pixel ----------
