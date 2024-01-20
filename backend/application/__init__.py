from flask import Flask
from flask_cors import CORS
from .database import mongo

def create_app():
    app = Flask(__name__)
    app.config["SECRET_KEY"] = "sampleSecretKey"
    app.config["MONGO_URI"] =  "mongodb+srv://admin:admin@cluster0.7jz4qws.mongodb.net/" # "mongodb://localhost:27017/udyam"
    mongo.init_app(app)
    CORS(app)

    from .auth import auth
    from .views import views
    from .challenges import challenges

    app.register_blueprint(auth, url_prefix="/")
    app.register_blueprint(views, url_prefix="/")
    pp.register_blueprint(challenges, url_prefix="/")

    return app