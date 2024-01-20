challenge_id = 1
users = [{"name": "person1", "challenges_attempted": [{"challenge_id": 1, "points": 5, "time_taken": 120, "date_attempted": "date1"}, {"challenge_id": 2, "points": 6, "time_taken": 60, "date_attempted": "date2"}]}, {"name": "person2", "challenges_attempted": [{"challenge_id": 1, "points": 4, "time_taken": 60, "date_attempted": "date1"}, {"challenge_id": 2, "points": 7, "time_taken": 120, "date_attempted": "date2"}]}]
points = {}

for user in users: # {"name": "person1", "challenges_attempted": [{"challenge_id": 1, "points": 5, "time_taken": 120, "date_attempted": date1}, {"challenge_id": 2, "points": 6, "time_taken": 60, "date_attempted": date2}]}}
  user_challenges = user["challenges_attempted"]
  challenge_points = [x["points"] for x in user_challenges if x["challenge_id"] == 1][0]
  points[user["name"]] = challenge_points

print(points)