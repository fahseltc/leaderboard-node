# leaderboard-node
Simple NodeJS leaderboard using postgres.
Used in my game project [Mega Mecha Marxist II](https://github.com/fahseltc/phaser-space-game)

Fully deployable on heroku free tier. No authentication.

# API
[(documented in Postman JSON files)](https://github.com/fahseltc/leaderboard-node/blob/master/docs/leaderboard.postman_collection.json)  
GET: /leaderboard - returns a sorted list of all the scores stored in the DB.  
POST: /leaderboard - submits a score to the DB.  
GET: /admin/wipe - wipes the DB. used between major updates to reset scoring.  
