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

@marketplace.route('/getPoints')
@cross_origin()
def getPoints():
    uname = request.args.get('name')
    document = db.students.find_one({"name": uname})

    if document:
        points_value = int(document["points"])
        return points_value
    else:
        return {"error":"Points not found."}

@marketplace.route("/buy", methods=['GET'])
@cross_origin()
def buy():
    uname = request.args.get('name')
    points = request.args.get('points')
    item = request.args.get('item')
    if points >= item['price']:
        user_document = db.users.find_one({"name": uname})  # Replace "Yuvi" with your user identification logic

    # Check if the user document exists and if points are sufficient to buy the item
    if user_document and points >= item['price']:
        # Define the new item to be added to the "items" dictionary
        new_item = {"item": item['item'], "price": item['price']}  # Assuming 'price' is a key in the 'item' dictionary

        # Update the "items" dictionary in the user document
        db.users.update_one(
            {"name": uname},  # Replace "Yuvi" with your user identification logic
            {"$push": {"items": new_item}},
            upsert=False
        )

        return jsonify({"message": "Item purchased successfully."})
    else:
        return jsonify({"message": "Insufficient points or user not found."})

    
