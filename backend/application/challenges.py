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
    challenge_id = int(request.args.get("challenge_id"))

    # Assuming 'challenges' is the name of your collection
    challenge = db.challenges.find_one({"challenge_id": challenge_id}, {"questions": 1, "_id": 0})

    if challenge:
        return jsonify(challenge["questions"])
    else:
        return jsonify({"error": "Challenge not found"})

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
    return {}

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
    if num_of_correct_answers == 0:
        return {"points": 0}
    
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

        return {"points": total_points}
    else:
        print("User not found.")
        return {"error":"error"}
