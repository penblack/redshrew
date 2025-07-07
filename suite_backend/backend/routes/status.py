from flask import Blueprint, jsonify

status_bp = Blueprint('status', __name__)

@status_bp.route("/", methods=["GET"])
def get_status():
    # Simulated status response — update later with real checks
    return jsonify({
        "phantomkey": True,
        "honeypitch": True,
        "event_log_count": 3,
        "system_health": "Healthy",
        "config_loaded": True
    })
