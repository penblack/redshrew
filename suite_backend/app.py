# backend/app.py
import os
import redis
from flask import Flask, jsonify
from flask_cors import CORS

from backend.routes.phantomkey import phantomkey_bp
from backend.routes.honeypitch import honeypitch_bp
from backend.routes.observer import observer_bp
from backend.routes.status import status_bp

app = Flask(__name__)

# --- CORS (frontend allow-list) ---
# Configure allowed origins via env var CORS_ALLOW_ORIGINS (comma-separated)
# Example (Render/Vercel):
#   CORS_ALLOW_ORIGINS="https://redshrew.com,https://www.redshrew.com,https://redshrew.vercel.app"
_default_origins = [
    "http://localhost:3000",
    "http://127.0.0.1:3000",
    "https://redshrew.com",
    "https://www.redshrew.com",
    "https://redshrew.vercel.app",
]
_env_origins = os.getenv("CORS_ALLOW_ORIGINS")
ALLOWED_ORIGINS = (
    [o.strip() for o in _env_origins.split(",") if o.strip()]
    if _env_origins
    else _default_origins
)

# Allow only /api/* from these origins (credentials not needed here; flip to True if you set cookies)
CORS(app, resources={r"/api/*": {"origins": ALLOWED_ORIGINS, "supports_credentials": False}})

# --- Redis / Valkey (Render Key Value) ---
# Use the INTERNAL Key Value URL, e.g. redis://red-xxxxxx:6379
REDIS_URL = os.environ.get("REDIS_URL")
app.config["r"] = None

if REDIS_URL:
    try:
        # Keep connections healthy and quick to fail if something’s wrong
        r = redis.Redis.from_url(
            REDIS_URL,
            decode_responses=True,
            health_check_interval=30,
            socket_keepalive=True,
            socket_timeout=2,
        )
        r.ping()  # if this raises, we’ll drop to in-memory in the route code
        app.config["r"] = r
        print(f"[redis] connected -> {REDIS_URL}")
    except Exception as e:
        app.config["r"] = None
        print(f"[redis] DISABLED (using in-memory fallback): {e!r}")
else:
    print("[redis] no REDIS_URL set; using in-memory fallback")

# --- Blueprints (mount all API routes under /api) ---
app.register_blueprint(phantomkey_bp, url_prefix="/api")
app.register_blueprint(honeypitch_bp, url_prefix="/api")
app.register_blueprint(observer_bp,   url_prefix="/api")
app.register_blueprint(status_bp,     url_prefix="/api")

# --- Health/Index ---
@app.route("/")
def index():
    return {"status": "RedShrew Backend is live", "cors_allowed": ALLOWED_ORIGINS}

@app.route("/healthz")
def healthz():
    return jsonify(ok=True), 200

# Optional: quick check to see if Redis is connected right now
@app.route("/health/redis")
def health_redis():
    r = app.config.get("r")
    if not r:
        return jsonify(connected=False, reason="disabled or not configured"), 200
    try:
        r.ping()
        return jsonify(connected=True), 200
    except Exception as e:
        return jsonify(connected=False, error=str(e)), 200

# --- Entrypoint ---
if __name__ == "__main__":
    # Render/Heroku style: PORT is provided; default to 5000 for local
    port = int(os.getenv("PORT", "5000"))
    host = os.getenv("HOST", "0.0.0.0")
    debug = os.getenv("FLASK_DEBUG", "1") == "1"
    app.run(host=host, port=port, debug=debug)
