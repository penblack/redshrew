# backend/services/observer.py
import os
import json
from datetime import datetime
from tempfile import NamedTemporaryFile
from typing import Optional, Dict, Any, List

# Base points to .../backend
BASE_DIR = os.path.dirname(os.path.dirname(__file__))

# Allow overriding the log directory via ENV (e.g., LOG_DIR=/data on Render)
LOG_DIR = os.environ.get("LOG_DIR", BASE_DIR)
os.makedirs(LOG_DIR, exist_ok=True)

LOG_FILE = os.path.join(LOG_DIR, "event_log.json")

def _ensure_log_file() -> None:
    """Create an empty JSON array if the log file doesn't exist or is corrupt."""
    try:
        if not os.path.exists(LOG_FILE):
            with open(LOG_FILE, "w", encoding="utf-8") as f:
                json.dump([], f)
        else:
            # Validate JSON; reset if corrupt
            with open(LOG_FILE, "r", encoding="utf-8") as f:
                json.load(f)
    except Exception:
        with open(LOG_FILE, "w", encoding="utf-8") as f:
            json.dump([], f)

def _read_logs() -> List[Dict[str, Any]]:
    try:
        with open(LOG_FILE, "r", encoding="utf-8") as f:
            return json.load(f)
    except (FileNotFoundError, json.JSONDecodeError):
        return []

def _atomic_write(logs: List[Dict[str, Any]]) -> None:
    # Write to a temp file then replace to reduce corruption risk
    dir_ = os.path.dirname(LOG_FILE)
    with NamedTemporaryFile("w", delete=False, dir=dir_, encoding="utf-8") as tf:
        json.dump(logs, tf, indent=2)
        tmp_name = tf.name
    os.replace(tmp_name, LOG_FILE)

def read_logs() -> List[Dict[str, Any]]:
    """Public helper for routes to fetch logs."""
    _ensure_log_file()
    return _read_logs()

def log_event(tool: str, action: str, status: str, metadata: Optional[Dict[str, Any]] = None) -> Dict[str, Any]:
    """
    Append an event to the observer log.
    Returns the event for convenience/testing.
    """
    event = {
        "timestamp": datetime.utcnow().isoformat() + "Z",
        "tool": tool,
        "action": action,
        "status": status,
        "metadata": metadata or {},
    }

    _ensure_log_file()
    logs = _read_logs()
    logs.append(event)
    _atomic_write(logs)
    return event
