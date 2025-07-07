# backend/services/honeypitch.py

from services.observer import log_event

def deploy_honeypitch():
    # Simulated trap deployment logic
    fake_traps = ["fake.docx", "canary-url.com"]

    # Log the event
    log_event(
        tool="HoneyPitch",
        action="deploy",
        status="success",
        metadata={"traps": fake_traps}
    )

    return {
        "status": "HoneyPitch started",
        "generated": fake_traps
    }
