# leaderboard-node
Simple NodeJS leaderboard using postgres.

Fully deployable on heroku free tier. No authentication.

# API
(documented in Postman JSON files in the /docs folder)
GET: /leaderboard - returns a sorted list of all the scores stored in the DB.
POST: /leaderboard - submits a score to the DB.
GET: /admin/wipe - wipes the DB. used between major updates to reset scoring.
