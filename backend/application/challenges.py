from flask import Blueprint, render_template, session, redirect, url_for, request, jsonify
from flask_cors import cross_origin
from .database import mongo

challenges = Blueprint("challenges", __name__)
db = mongo.db

@challenges.route('/getChallenges')
@cross_origin()
def getChallenges():
    challenges = {}

    for challenge in db.challenges.find({}, {"_id": 0, "challenge_id": 1, "title": 1}):
        challenges[challenge["challenge_id"]] = challenge["title"]
    
    return challenges

@challenges.route('/getLeaderboard')
@cross_origin()
def leaderboard():
    challenge_id = request.args.get("challenge_id")

    users = db.users.find({}, {"_id": 0, "name": 1, "challenges_attempted": 1}) # [{"name": "person1", "challenges_attempted": [{"challenge_id": 1, "points": 5, "time_taken": 120, "date_attempted": date1}, {"challenge_id": 2, "points": 6, "time_taken": 60, "date_attempted": date2}]}}, {"name": "person2", "challenges_attempted": [{"challenge_id": 1, "points": 4, "time_taken": 60, "date_attempted": date1}, {"challenge_id": 2, "points": 7, "time_taken": 120, "date_attempted": date2}]}}]
    user_points = {}

    for user in users: # {"name": "person1", "challenges_attempted": [{"challenge_id": 1, "points": 5, "time_taken": 120, "date_attempted": date1}, {"challenge_id": 2, "points": 6, "time_taken": 60, "date_attempted": date2}]}}
        challenge_points = [x["points"] for x in user["challenges_attempted"] if x["challenge_id"] == 1][0]
        user_points[user["name"]] = challenge_points
    
    return user_points

@challenges.route('/getQuestions')
@cross_origin()
def getQuestions():
    challenge_id = request.args.get("challenge_id")
    difficulty = request.args.get("difficulty")

    return dict(db.challenges.find_one({"challenge_id": challenge_id}, {"_id": 0, difficulty: 1}))[difficulty]

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
    db.users.update_one({"name": name}, {"$inc": {"points": points}})

    return {}
