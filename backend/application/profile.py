from flask import Blueprint, render_template, session, redirect, url_for, request, jsonify
from flask_cors import cross_origin
from collections import Counter
from .database import mongo


profile = Blueprint("profile", __name__)

db = mongo.db

@profile.route('/setAvatar', methods=['GET'])
@cross_origin()
def setAvatar():
    url = request.args.get('avatar_url')
    uname = request.args.get('username')
    existing_doc = db.users.find({'name': uname})
    if existing_doc:
        db.users.update_one(
            {'name':uname},
            {'$set':{'avatar_url':url}}
        )
        return {"success": True}
    else:
        return {'error':'Uname Not found in the profiles.'}

    
@profile.route('/getAvatar', methods=['GET'])
@cross_origin()
def getAvatar():
    uname = request.args.get('username')
    user = db.users.find_one({'name': uname}, {'_id': 0, 'avatar_url': 1})

    if user:
        return jsonify({'avatar_url': user['avatar_url']})
    else:
        return jsonify({'error': 'User not found'}), 404


@profile.route("/")
@cross_origin()
def getHeatmapData():
    name = request.args.get("name")

    challenges_attempted = db.users.find_one({"name": name}, {"_id": 0, "challenges_attempted": 1})
    dates = [challenge["date_attempted"] for challenge in challenges_attempted]
    heatmap_data = Counter(dates)
    return dict(heatmap_data)