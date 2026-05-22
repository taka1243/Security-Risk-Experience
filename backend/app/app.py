from flask import Flask
from os import getenv

from app.api.routes import api
from app.api.game import game
from app.mail.routes import mail

app = Flask(__name__)

app.register_blueprint(api)
app.register_blueprint(game, url_prefix="/api")
app.register_blueprint(mail)

if __name__ == "__main__":
    print(app.url_map)

    app.run(
        host=getenv("APP_ADDRESS", "127.0.0.1"),
        port=int(getenv("APP_PORT", 5000)),
        debug=True
    )