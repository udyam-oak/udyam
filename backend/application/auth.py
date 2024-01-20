from flask import Blueprint, request
from flask_cors import cross_origin
from bcrypt import hashpw, gensalt
from .database import mongo

auth = Blueprint("auth", __name__)  
db = mongo.db

@auth.route("/login", methods=["GET", "POST"])
@cross_origin()
def login():
  name = request.args.get("name")
  password = request.args.get("password")
  user = db.users.find_one({"name": name}, {"_id": 0, "name": 1, "password": 1})

  if user:
    if hashpw(password.encode("utf-8"), user["password"]) == user["password"]:
      return {"success": True}
      
    return {"success": False, "error": "Wrong Password"}
    
  return {"success": False, "error": "Name not found"}