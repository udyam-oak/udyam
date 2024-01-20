from flask import Blueprint, render_template, session, redirect, url_for, request, jsonify
from flask_cors import cross_origin
from auth import db
from .database import mongo

views = Blueprint("views", __name__)
db = mongo.db

@views.route("/")
@cross_origin()
def home():
    return {"text": "Home Page"}

@views.route('/getChallenges')
@cross_origin()
def GetChallenges():
    return db.challenges

@views.route('/getLeaderboard')
@cross_origin()
def Leaderboard():
    challenge_id = None
    return db.challenges({})

@views.route('/getUserRank')
@cross_origin()
def UserRank():
    challenge_id = None
    email = None
    return db.users.find_one()

@views.route('/getQuestions')
@cross_origin()
def getQuestions():
    challenge_id = None
    rating = None
    return db.users.find()
