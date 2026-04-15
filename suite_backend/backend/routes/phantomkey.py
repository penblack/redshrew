# backend/routes/phantomkey.py
from flask import Blueprint, request, jsonify, current_app, send_file
from collections import deque
from datetime import datetime
import os
import hmac
import hashlib
import time
import json
import uuid
import base64
import io
import requests

from redis.exceptions import RedisError
from backend.services.phantomkey import generate_fake_skeletons

phantomkey_bp = Blueprint("phantomkey", __name__)


# --------------------------------------------------------------------------------------
# App-scoped in-memory stores (used as Redis fallback)
# --------------------------------------------------------------------------------------
@phantomkey_bp.before_app_request
def _ensure_tracking_store():
    if not hasattr(current_app, "phantomkey_tracking"):
        current_app.phantomkey_tracking = {}       # tracking_id -> entry dict
    if not hasattr(current_app, "phantomkey_events"):
        current_app.phantomkey_events = deque(maxlen=500)
    if not hasattr(current_app, "phantomkey_tokens"):
        current_app.phantomkey_tokens = {}         # token -> tracking_id (reverse index)


# --------------------------------------------------------------------------------------
# Outbound webhook signing
# --------------------------------------------------------------------------------------
WEBHOOK_SECRET = os.environ.get("PHANTOMKEY_WEBHOOK_SECRET", "")

def _sign(body: bytes) -> str:
    if not WEBHOOK_SECRET:
        return ""
    mac = hmac.new(WEBHOOK_SECRET.encode("utf-8"), body, hashlib.sha256).hexdigest()
    return f"sha256={mac}"


# --------------------------------------------------------------------------------------
# Masked/"native-looking" beacon (optional advanced feature)
# --------------------------------------------------------------------------------------
MASKED_COLLECTOR_BASE = os.getenv("MASKED_COLLECTOR_BASE", "").rstrip("/")
MASKED_RID_SECRET = os.getenv("MASKED_RID_SECRET", "")

def _issue_rid(tracking_id: str, ttl_seconds: int | None) -> str:
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
# Redis helpers with graceful in-memory fallback
# --------------------------------------------------------------------------------------
def _pk_key(tracking_id: str) -> str:
    return f"pk:{tracking_id}"

def _tok_key(token: str) -> str:
    return f"pktok:{token}"

EVENTS_KEY = "pkevents"
EVENTS_MAX = 2000

def _r():
    return current_app.config.get("r")

def _disable_redis(e: Exception):
    print(f"[redis] disabling redis client due to error: {e!r}")
    current_app.config["r"] = None


# --- tracking entry (by tracking_id) ---

def _save_pk(tracking_id: str, data: dict, ttl_seconds: int | None):
    r = _r()
    if not r:
        current_app.phantomkey_tracking[tracking_id] = data
        return
    try:
        mapping = {
            "used":        int(data.get("used", 0)),
            "max_uses":    int(data.get("max_uses", 1)),
            "expires_at":  int(data.get("expires_at", 0)) if data.get("expires_at") else 0,
            "skeleton":    json.dumps(data.get("skeleton", {})),
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
            "used":        int(h.get("used", 0)),
            "max_uses":    int(h.get("max_uses", 1)),
            "expires_at":  int(h.get("expires_at", 0)) or None,
            "skeleton":    json.loads(h.get("skeleton") or "{}"),
            "webhook_url": h.get("webhook_url") or "",
        }
    except RedisError as e:
        _disable_redis(e)
        return current_app.phantomkey_tracking.get(tracking_id)

def _incr_used(tracking_id: str) -> int:
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


# --- token → tracking_id reverse index ---

def _save_token_mapping(token: str, tracking_id: str, ttl_seconds: int | None):
    """Store the reverse mapping so /v1/verify can look up a token instantly."""
    r = _r()
    if not r:
        current_app.phantomkey_tokens[token] = tracking_id
        return
    try:
        r.set(_tok_key(token), tracking_id)
        if ttl_seconds and ttl_seconds > 0:
            r.expire(_tok_key(token), ttl_seconds)
    except RedisError as e:
        _disable_redis(e)
        current_app.phantomkey_tokens[token] = tracking_id

def _lookup_token(token: str) -> str | None:
    """Return the tracking_id for a token, or None if not found."""
    r = _r()
    if not r:
        return current_app.phantomkey_tokens.get(token)
    try:
        return r.get(_tok_key(token))
    except RedisError as e:
        _disable_redis(e)
        return current_app.phantomkey_tokens.get(token)


# --- event log ---

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
# Auth attempt logging (shared by /v1/verify and the legacy /track endpoint)
# --------------------------------------------------------------------------------------
def _extract_token() -> str | None:
    """Pull a bearer/token credential out of the current request."""
    auth = request.headers.get("Authorization", "")
    if auth.lower().startswith("bearer "):
        return auth[7:].strip()
    if auth.lower().startswith("token "):
        return auth[6:].strip()
    # Fallback: query param or JSON body (covers SDK and curl -d patterns)
    return request.args.get("api_key") or (request.get_json(silent=True) or {}).get("api_key")


def _record_auth_hit(token: str, tracking_id: str):
    """
    Log a canary trigger with full forensic context and fire the webhook.
    Called whenever a PhantomKey token is used against the auth endpoint.
    """
    entry = _get_pk(tracking_id)
    now = int(time.time())

    try:
        ip = request.headers.get("X-Forwarded-For", request.remote_addr)
        if isinstance(ip, str) and "," in ip:
            ip = ip.split(",")[0].strip()
    except Exception:
        ip = None

    ua = request.headers.get("User-Agent", "")

    # Redact the actual token value — only keep the prefix for correlation
    redacted = (token[:8] + "***") if len(token) > 8 else "***"

    # Capture a small set of forensically useful headers (no full auth header)
    captured_headers = {}
    for h in ("Referer", "Origin", "X-Real-Ip", "CF-Connecting-IP", "CF-Ray"):
        v = request.headers.get(h)
        if v:
            captured_headers[h] = v

    new_used = _incr_used(tracking_id)

    evt = {
        "event":         "phantomkey.auth_attempt",
        "tracking_id":   tracking_id,
        "token_prefix":  redacted,
        "skeleton":      (entry or {}).get("skeleton", {}),
        "used":          new_used,
        "ts":            now,
        "ip":            ip,
        "user_agent":    ua,
        "headers":       captured_headers,
    }
    _append_event(evt)
    print(f"[PHANTOMKEY] auth attempt on {redacted} (tracking_id={tracking_id}, ip={ip})")

    webhook_url = (entry or {}).get("webhook_url")
    if webhook_url:
        payload = {
            "event":        "phantomkey.auth_attempt",
            "tracking_id":  tracking_id,
            "token_prefix": redacted,
            "ts":           now,
            "ip":           ip,
            "user_agent":   ua,
        }
        body = json.dumps(payload).encode("utf-8")
        headers = {"Content-Type": "application/json"}
        sig = _sign(body)
        if sig:
            headers["X-RedShrew-Signature"] = sig
        try:
            requests.post(webhook_url, data=body, headers=headers, timeout=5)
        except Exception as e:
            print(f"[PHANTOMKEY] Webhook notification failed: {e}")


# --------------------------------------------------------------------------------------
# Public-facing deception endpoint
# --------------------------------------------------------------------------------------
@phantomkey_bp.route("/v1/verify", methods=["GET", "POST", "HEAD"])
def verify_token():
    """
    Looks like a standard API key verification endpoint to an attacker.

    When a PhantomKey token is presented here (via Authorization: Bearer <token>
    or ?api_key=<token>), we silently log the attempt with full forensic context
    and fire the configured webhook — then return a convincing 401 that is
    identical to what any API service returns for an invalid key.

    The attacker learns nothing useful. The defender is immediately alerted.

    Detection layers (from earliest to latest):
      1. DNS canary (future): resolving <token>.dns.redshrew.com fires an alert
         before any TCP connection — same technique as Canarytokens.org subdomains
         and Thinkst Canary hardware. Requires operating an authoritative DNS server.
      2. HTTP canary (this endpoint): the auth attempt is logged with IP, User-Agent,
         and request headers the moment the 401 is requested.
    """
    token = _extract_token()
    if token:
        tracking_id = _lookup_token(token)
        if tracking_id:
            _record_auth_hit(token, tracking_id)

    # Always 401 — response is identical whether the token was recognised or not.
    # Include a request_id so it looks like a real API response.
    return jsonify({
        "error":      "Unauthorized",
        "message":    "Invalid or expired API key.",
        "request_id": str(uuid.uuid4()),
    }), 401


# --------------------------------------------------------------------------------------
# Key generation
# --------------------------------------------------------------------------------------
@phantomkey_bp.route("/phantomkey/start", methods=["POST"])
def start_phantomkey():
    """
    Create one or more PhantomKey tokens.

    Request body:
    {
      "fake_skeletons": ["aws", "github", "ssh"] | [{"type": "aws"}, ...],
      "webhook_url":    "https://example.com/hook",
      "ttl_seconds":    86400,
      "max_uses":       1
    }

    Response returns clean token strings only. The canary_url (internal
    tracking endpoint) is intentionally omitted — surfacing it to the caller
    would identify the credential as a honeypot.
    """
    cfg = request.get_json(silent=True) or {}

    raw_types = cfg.get("fake_skeletons", [])
    skeleton_types = [
        t if isinstance(t, str) else (t.get("type") if isinstance(t, dict) else None)
        for t in raw_types
    ]
    skeleton_types = [t for t in skeleton_types if t]

    webhook_url  = cfg.get("webhook_url")
    ttl_seconds  = int(cfg.get("ttl_seconds", 24 * 3600))
    max_uses     = max(1, int(cfg.get("max_uses", 1)))

    generated = generate_fake_skeletons(skeleton_types, webhook_url=None)

    now        = int(time.time())
    expires_at = now + ttl_seconds if ttl_seconds > 0 else None

    public_keys = []
    for skeleton in generated:
        tracking_id = str(uuid.uuid4())
        token       = skeleton["token"]

        # Augment the internal skeleton with operator-only fields
        skeleton["tracking_bit"] = tracking_id
        skeleton["canary_url"]   = f"/api/phantomkey/track/{tracking_id}"  # internal only
        skeleton["created_at"]   = datetime.utcfromtimestamp(now).strftime("%Y-%m-%dT%H:%M:%S.%fZ")

        # Optional masked beacon
        if MASKED_COLLECTOR_BASE:
            rid = _issue_rid(tracking_id, ttl_seconds)
            skeleton["masked_url"] = f"{MASKED_COLLECTOR_BASE}/api/pixel.gif?rid={rid}"

        # Persist tracking entry
        _save_pk(
            tracking_id,
            {
                "used":        0,
                "max_uses":    max_uses,
                "expires_at":  expires_at,
                "skeleton":    skeleton,
                "webhook_url": webhook_url,
            },
            ttl_seconds=ttl_seconds if ttl_seconds > 0 else None,
        )

        # Persist token → tracking_id reverse index
        _save_token_mapping(token, tracking_id, ttl_seconds if ttl_seconds > 0 else None)

        # Public response — no canary_url, no tracking internals beyond tracking_id
        public_keys.append({
            "type":        skeleton["type"],
            "token":       token,
            "tracking_id": tracking_id,
            "created_at":  skeleton["created_at"],
            "expires_at":  expires_at,
            "max_uses":    max_uses,
            "used":        0,
        })

    return jsonify({"status": "PhantomKey started", "generated": public_keys}), 200


# --------------------------------------------------------------------------------------
# Operator endpoints (not shown to end-users; dashboard/internal use only)
# --------------------------------------------------------------------------------------
@phantomkey_bp.route("/phantomkey/track/<tracking_id>", methods=["GET", "POST"])
def track_phantomkey(tracking_id):
    """Legacy direct-hit endpoint for the internal tracking URL."""
    entry = _get_pk(tracking_id)
    if not entry:
        return jsonify({"status": "not found"}), 404

    now        = int(time.time())
    expires_at = entry.get("expires_at")
    if expires_at and now > expires_at:
        return jsonify({"status": "expired"}), 410

    used     = int(entry.get("used", 0))
    max_uses = int(entry.get("max_uses", 1))
    if used >= max_uses:
        return jsonify({"status": "consumed"}), 409

    new_used = _incr_used(tracking_id)

    try:
        ip = request.headers.get("X-Forwarded-For", request.remote_addr)
        if isinstance(ip, str) and "," in ip:
            ip = ip.split(",")[0].strip()
    except Exception:
        ip = None

    evt = {
        "event":       "phantomkey.bit_triggered",
        "tracking_id": tracking_id,
        "skeleton":    entry.get("skeleton", {}),
        "used":        new_used,
        "max_uses":    max_uses,
        "ts":          now,
        "ip":          ip,
        "user_agent":  request.headers.get("User-Agent", ""),
        "created_at":  entry.get("skeleton", {}).get("created_at"),
    }
    _append_event(evt)

    webhook_url = entry.get("webhook_url")
    if webhook_url:
        payload = {
            "event":       "phantomkey.bit_triggered",
            "tracking_id": tracking_id,
            "skeleton":    entry.get("skeleton", {}),
            "used":        new_used,
            "max_uses":    max_uses,
            "ts":          now,
            "created_at":  entry.get("skeleton", {}).get("created_at"),
        }
        body = json.dumps(payload).encode("utf-8")
        hdrs = {"Content-Type": "application/json"}
        sig  = _sign(body)
        if sig:
            hdrs["X-RedShrew-Signature"] = sig
        try:
            requests.post(webhook_url, data=body, headers=hdrs, timeout=5)
        except Exception as e:
            print(f"[PHANTOMKEY] Webhook notification failed: {e}")

    print(f"[PHANTOMKEY] bit {tracking_id} triggered (use {new_used}/{max_uses})")
    return jsonify({
        "status":       "bit triggered",
        "tracking_id":  tracking_id,
        "used":         new_used,
        "max_uses":     max_uses,
    }), 200


@phantomkey_bp.route("/phantomkey/status/<tracking_id>", methods=["GET"])
def phantom_status(tracking_id):
    entry = _get_pk(tracking_id)
    if not entry:
        return jsonify({"status": "not found"}), 404

    now        = int(time.time())
    expires_at = entry.get("expires_at")
    ttl_left   = max(0, (expires_at - now)) if expires_at else None
    remaining  = max(0, int(entry.get("max_uses", 1)) - int(entry.get("used", 0)))

    return jsonify({
        "status":           "ok",
        "tracking_id":      tracking_id,
        "used":             int(entry.get("used", 0)),
        "max_uses":         int(entry.get("max_uses", 1)),
        "expires_at":       expires_at,
        "ttl_seconds_left": ttl_left,
        "remaining_uses":   remaining,
        # skeleton returned here for operator tooling; never shown in user-facing UI
        "skeleton":         entry.get("skeleton", {}),
    }), 200


@phantomkey_bp.route("/phantomkey/logs", methods=["GET"])
def phantom_logs():
    try:
        limit = int(request.args.get("limit", 200))
    except Exception:
        limit = 200
    events = _get_events(limit)
    return jsonify({"events": events, "count": len(events)}), 200


# --------------------------------------------------------------------------------------
# Masked pixel beacon
# --------------------------------------------------------------------------------------
_GIF_1PX = (
    b"GIF89a\x01\x00\x01\x00\x80\x00\x00\x00\x00\x00\xff\xff\xff!"
    b"\xf9\x04\x01\x00\x00\x00\x00,\x00\x00\x00\x00\x01\x00\x01"
    b"\x00\x00\x02\x02D\x01\x00;"
)

def _parse_rid(rid: str) -> dict | None:
    if not rid:
        return None
    try:
        if "." in rid and MASKED_RID_SECRET:
            p1, p2 = rid.split(".", 1)
            body = base64.urlsafe_b64decode(p1 + "===")
            mac  = base64.urlsafe_b64decode(p2 + "===")
            expect = hmac.new(MASKED_RID_SECRET.encode("utf-8"), body, hashlib.sha256).digest()
            if not hmac.compare_digest(mac, expect):
                return None
        else:
            body = base64.urlsafe_b64decode(rid + "===")
        payload = json.loads(body.decode("utf-8"))
        if payload.get("exp") and int(time.time()) > int(payload["exp"]):
            return None
        return payload
    except Exception:
        return None


@phantomkey_bp.route("/pixel.gif", methods=["GET"])
def pixel():
    rid     = request.args.get("rid", "")
    payload = _parse_rid(rid)
    if not payload:
        return send_file(io.BytesIO(_GIF_1PX), mimetype="image/gif")

    tid   = payload.get("tid")
    entry = _get_pk(tid) if tid else None

    try:
        ip = request.headers.get("X-Forwarded-For", request.remote_addr)
        if isinstance(ip, str) and "," in ip:
            ip = ip.split(",")[0].strip()
    except Exception:
        ip = None

    evt = {
        "event":       "phantomkey.masked_hit",
        "tracking_id": tid,
        "skeleton":    (entry or {}).get("skeleton", {}),
        "ts":          int(time.time()),
        "ip":          ip,
        "user_agent":  request.headers.get("User-Agent", ""),
        "rid_iat":     payload.get("iat"),
        "rid_exp":     payload.get("exp"),
    }
    _append_event(evt)

    return send_file(io.BytesIO(_GIF_1PX), mimetype="image/gif")
