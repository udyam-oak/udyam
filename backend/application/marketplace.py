from flask import Blueprint, render_template, session, redirect, url_for, request, jsonify
from flask_cors import cross_origin
from auth import db
from .database import mongo

marketplace = Blueprint("marketplace", __name__)

