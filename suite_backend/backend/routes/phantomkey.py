from flask import Blueprint, request, jsonify
from services.phantomkey import deploy_phantomkey


phantomkey_bp = Blueprint("phantomkey", __name__)

@phantomkey_bp.route("/phantomkey/start", methods=["POST"])
def start_phantomkey():
    config = request.json or {}
    skeletons = config.get("fake_skeletons", [])
    result = generate_fake_skeletons(skeletons)
    return jsonify({"status": "PhantomKey started", "generated": result})
