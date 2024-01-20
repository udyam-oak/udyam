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

@challenges.route('/calculateTotalPoints', methods=['GET'])
@cross_origin()
def calculateTotal():
    number_of_qs = 10
    points_per_question = 2
    uname = request.args.get('name')
    num_of_correct_answers = int(request.args.get('num_of_correct_answers'))
    total_time_taken = int(request.args.get('total_time_taken'))
    multiplier = request.args.get('multiplier_activated')
    total_questions = 10
    points_per_question = 5
    average_time_per_question = total_time_taken / total_questions

    time_weight = 1 + (total_time_taken / (num_of_correct_answers * average_time_per_question))

    # Apply multiplier only if it's True
    if multiplier:
        points_per_question *= 2

    total_points = int(points_per_question * num_of_correct_answers * time_weight)
    user_document = db.users.find_one({"name": uname})  
    if user_document:
        current_points = user_document.get("points", 0)

        # Update the points by adding 10
        new_points = current_points + total_points

        # Update the points in the user document
        db.users.update_one(
            {"name": uname},  # Replace "Yuvi" with your user identification logic
            {"$set": {"points": new_points}},
            upsert=False
        )

        return total_points
    else:
        print("User not found.")
        return {"error":"error"}


    