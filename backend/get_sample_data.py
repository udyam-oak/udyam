user_credentials = {
    "Ayaan": "Yoga@Home2022",
    "Jonny": "MasalaMagic!",
    "Tom": "MughalMonarch23",
    "Donald": "RiverRituals#",
    "Joe": "BackwaterBliss42"
}

from pymongo import MongoClient
from bcrypt import hashpw, gensalt

db = MongoClient().udyam

for name, password in user_credentials.items():
  db.users.insert_one({"name": name, "password": hashpw(password.encode("utf-8"), gensalt())})