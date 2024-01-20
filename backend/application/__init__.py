from flask import Flask
from flask_cors import CORS
from .database import mongo

def create_app():
    app = Flask(__name__)
    app.config["SECRET_KEY"] = "sampleSecretKey"
    app.config["MONGO_URI"] = "mongodb://localhost:27017/udyam" #"mongodb+srv://admin:admin@cluster0.7jz4qws.mongodb.net/" 
    mongo.init_app(app)
    CORS(app)

    from .views import views
    from .auth import auth
    from .marketplace import marketplace


    app.register_blueprint(marketplace, url_prefix='/')
    app.register_blueprint(views, url_prefix="/")
    app.register_blueprint(auth, url_prefix="/")

    return app