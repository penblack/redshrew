import os
import json
from datetime import datetime

# Optional: integrate with Observer log (preferred)
try:
    from backend.services.observer import log_event
except Exception:
    log_event = None  # if observer not available, we’ll still return a result

BASE_DIR = os.path.dirname(os.path.dirname(__file__))  # .../backend
TRAP_DIR = os.path.join(BASE_DIR, "honeypitch_traps")
LOG_FILE = os.path.join(BASE_DIR, "event_log.json")  # legacy fallback if needed

def _append_log_fallback(event: dict) -> None:
    """Fallback local log if Observer isn't available."""
    try:
        logs = []
        if os.path.exists(LOG_FILE):
            with open(LOG_FILE, "r", encoding="utf-8") as f:
                logs = json.load(f)
        logs.append(event)
        with open(LOG_FILE, "w", encoding="utf-8") as f:
            json.dump(logs, f, indent=2)
    except Exception as e:
        print(f"[honeypitch] log write failed: {e}")

def deploy_honeypitch(webhook_url: str | None = None) -> dict:
    """
    TEMP implementation: simulate a HoneyPitch deploy.
    Returns a JSON-serializable dict your route can jsonify.
    """
    os.makedirs(TRAP_DIR, exist_ok=True)

    trap_files = ["decoy_report.pdf", "admin_creds.xlsx"]
    result = {
        "status": "HoneyPitch deployed",
        "trap_files": trap_files,
        "trap_dir": TRAP_DIR,
        "webhook_url": webhook_url,
        "timestamp": datetime.utcnow().isoformat() + "Z",
    }

    # Log via Observer if available, otherwise fallback
    if log_event:
        log_event("honeypitch", "deploy", "ok", {"files": trap_files, "dir": TRAP_DIR})
    else:
        _append_log_fallback({
            "timestamp": result["timestamp"],
            "tool": "honeypitch",
            "action": "deploy",
            "status": "ok",
            "metadata": {"files": trap_files, "dir": TRAP_DIR},
        })

    return result
