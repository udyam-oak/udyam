from flask import Blueprint, render_template, redirect, url_for, session
from flask_cors import cross_origin
from bcrypt import hashpw, gensalt
from .database import mongo

auth = Blueprint("auth", __name__)  
db = mongo.db

@auth.route("/account")
@cross_origin()
def account():
    return {"text": "Account Page"}