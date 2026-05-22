from flask import Blueprint, jsonify, request
import json
from pathlib import Path

game = Blueprint("game", __name__)

DATA_PATH = Path(__file__).resolve().parent.parent / "data" / "mails.json"

def load_mails():
    with open(DATA_PATH, encoding="utf-8") as f:
        return json.load(f)

@game.route("/question/<int:mail_id>", methods=["GET"])
def get_question(mail_id):
    mails = load_mails()

    for mail in mails:
        if mail["id"] == mail_id:
            return jsonify({
                "id": mail["id"],
                "type": mail["type"],
                "subject": mail["subject"],
                "senderName": mail["senderName"],
                "senderEmail": mail["senderEmail"],
                "body": mail["body"],
                "linkText": mail["linkText"],
                "linkUrl": mail["linkUrl"]
            })

    return jsonify({
        "error": "mail not found"
    }), 404

score = 0

@game.route("/answer", methods=["POST"])
def answer_question():
    global score

    data = request.get_json()

    mail_id = data.get("questionId")
    user_answer = data.get("answer")

    mails = load_mails()

    for mail in mails:
        if mail["id"] == mail_id:
            is_correct = (
                user_answer == "phishing" and mail["isPhishing"]
            ) or (
                user_answer == "safe" and not mail["isPhishing"]
            )

            if is_correct:
                score += 10

            return jsonify({
                "correct": is_correct,
                "score": score,
                "goToSupportScam": not is_correct,
                "explanation": mail["suspiciousPoints"]
            })

    return jsonify({
        "error": "mail not found"
    }), 404