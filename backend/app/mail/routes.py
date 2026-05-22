from flask import Blueprint, send_from_directory
from pathlib import Path

mail = Blueprint("mail", __name__)

DIST_PATH = Path(__file__).resolve().parents[3] / "mail" / "dist"

@mail.route("/")
def index():
    return send_from_directory(DIST_PATH, "index.html")

@mail.route("/assets/<path:filename>")
def assets(filename):
    return send_from_directory(DIST_PATH / "assets", filename)