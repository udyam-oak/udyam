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
    return {}

@challenges.route('/getUserRank')
@cross_origin()
def userRank():
    return {}

@challenges.route('/getQuestions')
@cross_origin()
def getQuestions():
    return {}
