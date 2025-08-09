from flask import Blueprint, jsonify
from backend.services.honeypitch import deploy_honeypitch

honeypitch_bp = Blueprint("honeypitch", __name__)

@honeypitch_bp.route("/honeypitch/start", methods=["POST"])
def start_honeypitch():
    result = deploy_honeypitch()
    return jsonify(result), 200
