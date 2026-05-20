from flask import Blueprint, send_from_directory
from os import path

mail = Blueprint("mail", __name__,)

@mail.route('/dist/mail/<path:filename>')
def serve_vite_assets(filename):
    dist = path.join(mail.root_path, "../dist/mail")
    return send_from_directory(dist, filename)

@mail.route("/")
def index():
    dist = path.join(mail.root_path, "../dist/mail")
    return send_from_directory('dist', "index.html")

