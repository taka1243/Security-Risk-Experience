from flask import Blueprint, jsonify, request
from pathlib import Path
import json
import random

game = Blueprint("game", __name__)

DATA_PATH = Path(__file__).resolve().parent.parent / "data" / "mails.json"

random_questions = []


def load_mails():
    with open(DATA_PATH, encoding="utf-8") as f:
        return json.load(f)


def generate_random_questions():
    global random_questions

    mails = load_mails()

    # 15件の中からランダム10問
    question_count = min(10, len(mails))

    random_questions = random.sample(mails, question_count)


# 初回生成
generate_random_questions()


@game.route("/question/<int:index>", methods=["GET"])
def get_question(index):

    if index < 1 or index > len(random_questions):
        return jsonify({"error": "question not found"}), 404

    return jsonify(random_questions[index - 1])


@game.route("/answer", methods=["POST"])
def answer_question():

    data = request.get_json()

    question_id = data.get("questionId")
    answer = data.get("answer")

    for mail in random_questions:

        if mail["id"] == question_id:

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

    return jsonify({
        "count": len(random_questions)
    })


# リスタート時に新しくランダム生成
@game.route("/questions/reset", methods=["POST"])
def reset_questions():

    generate_random_questions()

    return jsonify({
        "message": "questions reset"
    })