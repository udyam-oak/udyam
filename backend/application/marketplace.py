from flask import Blueprint, render_template, session, redirect, url_for, request, jsonify
from flask_cors import cross_origin
from .database import mongo

marketplace = Blueprint("marketplace", __name__)

db = mongo.db


# helper
def getPointsHelp(user):
    uname = user
    document = db.users.find_one({"name": uname})

    if document:
        points_value = int(document["total_points"])
        return points_value
    else:
        return -1
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
    return {"points": getPointsHelp(request.args.get('name'))}

@marketplace.route("/buy", methods=['GET'])
@cross_origin()
def buy():
    uname = request.args.get('name')
    points = getPointsHelp(uname) 
    item = request.args.get('item')
    price = int(request.args.get('price'))
    user_document = db.users.find_one({"name": uname})  # Replace "Yuvi" with your user identification logic

    # Check if the user document exists and if points are sufficient to buy the item
    if user_document and points >= price:
        # Define the new item to be added to the "items" dictionary
        new_item = {"item": item, "price": price}  # Assuming 'price' is a key in the 'item' dictionary

        # Update the "items" dictionary in the user document
        db.users.update_one(
            {"name": uname},  # Replace "Yuvi" with your user identification logic
            {"$push": {"items": new_item}},
            upsert=False
        )
        
        new_points = points - price

        db.users.update_one(
            {"name": uname},  # Replace "Yuvi" with your user identification logic
            {"$set": {"total_points": new_points}}
                        )
        
        return jsonify({"message": "Item purchased successfully."})
    else:
        return jsonify({"message": "Insufficient points or user not found."})
    
<<<<<<< HEAD

@marketplace.route("/getUserItems", methods=['GET'])
@cross_origin()
def get_user_item_count():
    user_name = request.args.get('name')  # Adjust the parameter based on your API design
    item_name = request.args.get('item')  # Get the name of the item you're interested in
=======
@marketplace.route("/get_user_items", methods=['GET'])
@cross_origin()
def get_user_items():
    user_name = request.args.get('name')  # Adjust the parameter based on your API design
>>>>>>> master

    # Fetch the document for the user based on the provided name
    user_document = db.users.find_one({"name": user_name})

    # Check if the user document exists
    if user_document:
<<<<<<< HEAD
        # Get the user's items list
        user_items = user_document.get("items", [])

        # Initialize item count to 0
        item_count = 0

        # Iterate through the user's items and count occurrences of the specified item
        for item in user_items:
            if item.get("item") == item_name:
                item_count += 1

        return jsonify({"item_count": item_count})
=======
        # Get the user's items dictionary
        user_items = user_document.get("items", {})

        return jsonify({"user_items": user_items})
>>>>>>> master
    else:
        return jsonify({"message": "User not found."})