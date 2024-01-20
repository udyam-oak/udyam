from flask import Blueprint, render_template, session, redirect, url_for, request, jsonify
from flask_cors import cross_origin
from .database import mongo


profile = Blueprint("profile", __name__)

db = mongo

@profile.route('setAvatar', methods=['GET'])
@cross_origin
def setAvatar():
    url = request.args.get('avatar_url')
    uname = request.args.get('username')
    existing_doc = db.profiles.find({'username': uname})
    if existing_doc:
        return db.proflies.update_one(
            {'username':uname},
            {'$set':{'avatar_url':url}}
        )
    else:
        return {'error':'Uname Not found in the profiles.'}

    
