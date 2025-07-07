# backend/services/observer.py
import json
from datetime import datetime

LOG_FILE = "event_log.json"

def log_event(tool, action, status, metadata=None):
    event = {
        "timestamp": datetime.utcnow().isoformat() + "Z",
        "tool": tool,
        "action": action,
        "status": status,
        "metadata": metadata or {}
    }

    try:
        # Load existing logs
        with open(LOG_FILE, "r") as f:
            logs = json.load(f)
    except (FileNotFoundError, json.JSONDecodeError):
        logs = []

    # Append and save
    logs.append(event)
    with open(LOG_FILE, "w") as f:
        json.dump(logs, f, indent=2)
