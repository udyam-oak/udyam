from flask import Blueprint, request
from flask_cors import cross_origin
from bcrypt import hashpw, gensalt
from .database import mongo

teacher = Blueprint("teacher", __name__)  
db = mongo.db
challenge = {}

@teacher.route("/teacherLogin", methods=["GET", "POST"])
@cross_origin()
def teacherLogin():
  name = request.args.get("name")
  password = request.args.get("password")
  user = db.teachers.find_one({"name": name}, {"_id": 0, "name": 1, "password": 1})

  if user:
    if hashpw(password.encode("utf-8"), user["password"]) == user["password"]:
      return {"success": True}
      
    return {"success": False, "error": "Wrong Password"}
    
  return {"success": False, "error": "Name not found"}


@teacher.route("/createChallenge", methods=["GET", "POST"])
@cross_origin()
def createChallenge():
  name = request.args.get("name")
  isFirstQuestion = request.args.get("isFirstQuestion")
  isLastQuestion = request.args.get("isLastQuestion")
  question = request.args.get("question")
  answer = request.args.get("answer")

  if isFirstQuestion == "true":
    challenge = {question: answer}
    challenge_id = max([i["challenge_id"] for i in db.challenges.find()]) + 1
    db.teachers.update_one({"name": name}, {"$push": {"challenges_created": challenge_id}})
  
  else:
    challenge[question] = answer
  
  if isLastQuestion == "true":
    db.challenges.insert_one(challenge)