from flask import Blueprint, request, jsonify, current_app
import uuid
import requests
from services.phantomkey import generate_fake_skeletons

phantomkey_bp = Blueprint("phantomkey", __name__)

if not hasattr(current_app, 'phantomkey_tracking'):
    current_app.phantomkey_tracking = {}

@phantomkey_bp.route("/phantomkey/start", methods=["POST"])
def start_phantomkey():
    config = request.json or {}
    skeleton_types = config.get("fake_skeletons", [])
    webhook_url = config.get("webhook_url")

    # Pass webhook_url so creation notifies you
    generated = generate_fake_skeletons(skeleton_types, webhook_url=webhook_url)

    tracked = []
    for skeleton in generated:
        tracking_id = str(uuid.uuid4())
        skeleton['tracking_bit'] = tracking_id
        skeleton['canary_url'] = f"/phantomkey/track/{tracking_id}"

        current_app.phantomkey_tracking[tracking_id] = {
            "used": False,
            "skeleton": skeleton,
            "webhook_url": webhook_url
        }
        tracked.append(skeleton)

    return jsonify({"status": "PhantomKey started", "generated": tracked})

@phantomkey_bp.route("/phantomkey/track/<tracking_id>", methods=["GET", "POST"])
def track_phantomkey(tracking_id):
    tracking = getattr(current_app, 'phantomkey_tracking', {})
    entry = tracking.get(tracking_id)
    if entry and not entry["used"]:
        entry["used"] = True
        webhook_url = entry.get("webhook_url")
        if webhook_url:
            try:
                requests.post(webhook_url, json={
                    "event": "PhantomKey bit triggered",
                    "tracking_id": tracking_id,
                    "skeleton": entry["skeleton"]
                })
            except Exception as e:
                print(f"Webhook notification failed: {e}")
        print(f"[PHANTOMKEY] Tracking bit {tracking_id} triggered!")
        return jsonify({"status": "bit triggered", "tracking_id": tracking_id}), 200

    return jsonify({"status": "not found or already used"}), 404
