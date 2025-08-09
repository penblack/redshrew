# app.py
from flask import Flask
from backend.routes.phantomkey import phantomkey_bp
from backend.routes.honeypitch import honeypitch_bp
from backend.routes.observer import observer_bp
from backend.routes.status import status_bp

app = Flask(__name__)

# Mount all API routes under /api
app.register_blueprint(phantomkey_bp, url_prefix="/api")
app.register_blueprint(honeypitch_bp, url_prefix="/api")
app.register_blueprint(observer_bp,   url_prefix="/api")
app.register_blueprint(status_bp,     url_prefix="/api")

@app.route("/")
def index():
    return {"status": "RedShrew Backend is live"}

if __name__ == "__main__":
    app.run(debug=True, port=5001)
