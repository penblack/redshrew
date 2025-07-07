from flask import Flask
from routes.phantomkey import phantomkey_bp
from routes.honeypitch import honeypitch_bp
from routes.observer import observer_bp
from routes.status import status_bp

app = Flask(__name__)
app.register_blueprint(phantomkey_bp)
app.register_blueprint(honeypitch_bp)
app.register_blueprint(observer_bp)
app.register_blueprint(status_bp, url_prefix="/api")

@app.route("/")
def index():
    return {"status": "RedShrew Backend is live"}

if __name__ == "__main__":
    app.run(debug=True)


@app.route("/api/honeypitch/start", methods=["POST"])
def start_honeypitch():
    # TEMP fake logic until real trap is added
    return jsonify({
        "status": "HoneyPitch deployed",
        "trap_files": ["decoy_report.pdf", "admin_creds.xlsx"]
    })


