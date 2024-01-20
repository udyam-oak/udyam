from flask import Blueprint, render_template, session, redirect, url_for, request, jsonify
from flask_cors import cross_origin
from .database import mongo

marketplace = Blueprint("marketplace", __name__)
db = mongo.db

@marketplace.route('/getMarketplace')
def getMarketplace():
    return db.marketplace({})
