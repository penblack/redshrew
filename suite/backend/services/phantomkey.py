# services/phantomkey.py
import os
import json
import random
import requests
from datetime import datetime
from services.observer import log_event

FAKE_SKELETON_DIR = "fake_skeletons"
SKELETON_TEMPLATES = {
    "aws": "AKIA{random}FAKE",
    "github": "ghp_{random}",
    "stripe": "sk_live_{random}",
    "ssh": "ssh-rsa AAAAB3NzaC1yc2EAAAADAQABAAABAQD{random}"
}

def load_webhook_config():
    try:
        import yaml
        with open("config.yaml", "r") as f:
            config = yaml.safe_load(f)
        return config.get("webhook", {})
    except Exception:
        return {}

def generate_random_string(length=24):
    return ''.join(random.choices("ABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789", k=length))

def deploy_phantomkey():
    os.makedirs(FAKE_SKELETON_DIR, exist_ok=True)
    skeletons = {}

    for name, template in SKELETON_TEMPLATES.items():
        skeleton_value = template.replace("{random}", generate_random_string())
        filename = f"{name}_skeleton.txt"
        filepath = os.path.join(FAKE_SKELETON_DIR, filename)
        with open(filepath, "w") as f:
            f.write(skeleton_value)
        skeletons[name] = skeleton_value

    log_event("phantomkey", "generate_skeletons", "success", metadata={"skeletons": list(skeletons.keys())})

    # Optional webhook trigger
    webhook = load_webhook_config()
    if webhook.get("enabled") and webhook.get("url"):
        try:
            requests.post(webhook["url"], json={
                "tool": "phantomkey",
                "timestamp": datetime.utcnow().isoformat() + "Z",
                "action": "generate_skeletons",
                "status": "success",
                "skeletons_generated": list(skeletons.keys())
            })
        except Exception as e:
            log_event("phantomkey", "webhook_error", "fail", metadata={"error": str(e)})

    if webhook.get("enabled") and webhook.get("url"):
    try:
        print("[DEBUG] Sending webhook POST to:", webhook["url"])  # Add this
        res = requests.post(webhook["url"], json={
            "tool": "phantomkey",
            "timestamp": datetime.utcnow().isoformat() + "Z",
            "action": "generate_skeletons",
            "status": "success",
            "skeletons_generated": list(skeletons.keys())
        })
        print("[DEBUG] Webhook POST sent, response code:", res.status_code)  # Add this
        print("[DEBUG] Response body:", res.text)  # Optional
    except Exception as e:
        print("[ERROR] Webhook failed:", str(e))
        log_event("phantomkey", "webhook_error", "fail", metadata={"error": str(e)})


    return {
        "status": "PhantomKey deployed",
        "generated": list(skeletons.keys())
    }
