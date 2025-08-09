# backend/routes/observer.py
from flask import Blueprint, jsonify
import json
from backend.services.observer import LOG_FILE

observer_bp = Blueprint("observer", __name__)

@observer_bp.route("/observer/logs", methods=["GET"])
def get_event_logs():
    try:
        with open(LOG_FILE, "r", encoding="utf-8") as f:
            logs = json.load(f)
    except (FileNotFoundError, json.JSONDecodeError):
        logs = []
    return jsonify(logs), 200
