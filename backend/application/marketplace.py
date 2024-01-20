from flask import Blueprint, render_template, session, redirect, url_for, request, jsonify
from flask_cors import cross_origin
from .database import mongo

marketplace = Blueprint("marketplace", __name__)


db = mongo

@marketplace.route('/getMarketplace')
@cross_origin()
def getMarketplace():
    x = db.marketplace.find({}, {'item':1,'price':1,'_id':0})
    y = list(x)
    items_dict = {doc['item']: doc['price'] for doc in y}
    return items_dict
