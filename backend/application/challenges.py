from flask import Blueprint, render_template, session, redirect, url_for, request, jsonify
from flask_cors import cross_origin
from .database import mongo

challenges = Blueprint("challenges", __name__)
db = mongo.db

@challenges.route('/getChallenges')
@cross_origin()
def getChallenges():
    challenges = {}

    for challenge in db.challenges.find():
        challenges[challenge["challenge_id"]] = challenge["title"]
    
    return challenges

@challenges.route('/getLeaderboard')
@cross_origin()
def leaderboard():
    return {}

@challenges.route('/getUserRank')
@cross_origin()
def userRank():
    return {}

@challenges.route('/getQuestions')
@cross_origin()
def getQuestions():
    challenge_id = request.args.get("challenge_id")
    difficulty = request.args.get("difficulty")

    return dict(db.challenges.find_one({"challenge_id": challenge_id}))[difficulty]

@challenges.route("/storeUserChallengeResult")
@cross_origin()
def storeUserChallengeResult():
    challenge_id = request.args.get("challenge_id")
    name = request.args.get("name")
    points = request.args.get("points")
    time_taken = request.args.get("time_taken")
    date_attempted = request.args.get("date_attempted")

    db.users.update_one({"name": name}, {"$push": {"challenges_attempted": {"challenge_id": challenge_id,
                                                                            "points": points,
                                                                            "time_taken": time_taken,
                                                                            "date_attempted": date_attempted}}})
