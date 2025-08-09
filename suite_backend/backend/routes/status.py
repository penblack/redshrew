from flask import Blueprint, jsonify
import os
import json
from backend.services.observer import LOG_FILE

status_bp = Blueprint("status", __name__)

@status_bp.route("/status", methods=["GET"])
def get_status():
    """
    Simple system status check.
    Later, replace the hard-coded values with actual service health checks.
    """
    # Count observer log events
    try:
        if os.path.exists(LOG_FILE):
            with open(LOG_FILE, "r", encoding="utf-8") as f:
                logs = json.load(f)
            event_log_count = len(logs)
        else:
            event_log_count = 0
    except Exception:
        event_log_count = 0

    return jsonify({
        "phantomkey": True,       # replace with real health checks later
        "honeypitch": True,       # replace with real health checks later
        "event_log_count": event_log_count,
        "system_health": "Healthy",
        "config_loaded": True
    }), 200
