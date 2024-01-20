from flask import Blueprint, render_template, session, redirect, url_for, request, jsonify
from flask_cors import cross_origin
from .database import mongo

challenges = Blueprint("challenges", __name__)
db = mongo.db

@challenges.route('/getChallenges')
@cross_origin()
def getChallenges():
    return {}

@challenges.route('/getLeaderboard')
@cross_origin()
def leaderboard():
    challenge_id = None
    return {}

@challenges.route('/getUserRank')
@cross_origin()
def userRank():
    challenge_id = None
    email = None
    return {}

@challenges.route('/getQuestions')
@cross_origin()
def getQuestions():
    challenge_id = None
    rating = None
    return {}
