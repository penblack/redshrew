# backend/app.py
import os
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

import os
from redis import Redis

REDIS_URL = os.environ.get("REDIS_URL")  # e.g. rediss://:pass@host:port/0
r = None
if REDIS_URL:
    # decode_responses=True -> strings in/out
    r = Redis.from_url(REDIS_URL, decode_responses=True)
app.config["r"] = r


# Allow only /api/* from these origins (credentials not needed here; flip to True if you set cookies)
CORS(app, resources={r"/api/*": {"origins": ALLOWED_ORIGINS, "supports_credentials": False}})

# --- Blueprints ---
# Mount all API routes under /api
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

# --- Entrypoint ---
if __name__ == "__main__":
    # Render/Heroku style: PORT is provided; default to 5000 for local
    port = int(os.getenv("PORT", "5000"))
    host = os.getenv("HOST", "0.0.0.0")
    debug = os.getenv("FLASK_DEBUG", "1") == "1"
    app.run(host=host, port=port, debug=debug)
