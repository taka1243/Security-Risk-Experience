from flask import Flask
from os import getenv
from app.mail.routes import mail
from app.api.routes import api

app = Flask(__name__,)

app.register_blueprint(mail)
app.register_blueprint(api)

if __name__ == "__main__":
    print(app.url_map)

    app.run(host=getenv("APP_ADDRESS", '127.0.0.1'), \
            port=int(getenv("APP_PORT", 5000)), \
            debug=True)
