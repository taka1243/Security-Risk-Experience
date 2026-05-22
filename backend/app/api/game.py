from flask import Blueprint, jsonify, request
from pathlib import Path
import json

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
            return jsonify(mail)

    return jsonify({"error": "mail not found"}), 404


@game.route("/answer", methods=["POST"])
def answer_question():
    data = request.get_json()

    mail_id = data.get("questionId")
    answer = data.get("answer")

    mails = load_mails()

    for mail in mails:
        if mail["id"] == mail_id:
            correct = (
                mail["isPhishing"] and answer == "phishing"
            ) or (
                not mail["isPhishing"] and answer == "safe"
            )

            return jsonify({
                "correct": correct,
                "goToSupportScam": not correct,
                "explanation": mail["suspiciousPoints"]
            })

    return jsonify({"error": "mail not found"}), 404


@game.route("/questions/count", methods=["GET"])
def get_question_count():
    mails = load_mails()

    return jsonify({
        "count": len(mails)
    })