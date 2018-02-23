const Database = require('./db/postgres-db.js');

var DB = new Database();

const express = require('express')
const app = express()
app.use(express.urlencoded( {extended: true} )); // to support URL-encoded bodies

app.listen(process.env.PORT || 3000, () => console.log('Example app listening on port: ' + (process.env.PORT || 3000)));

app.use(function(req, res, next) {
  res.header("Access-Control-Allow-Origin", "*");
  res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
  next();
});

app.get('/admin/wipe', wipe_db );
app.get('/', (req, res) => res.send('Hello World! env:' + process.env.environment));
app.get('/leaderboard', get_leaderboard);
app.post('/leaderboard/', write_score);

function write_score(req, res) {
  var score = req.body.score;
  var name = req.body.name;
  console.log("Name: " + name + " Scored: " + score);

  if(score != null && name != null) {
    DB.write(score, name);
    res.sendStatus(200);
  } else {
    res.sendStatus(422);
  }
}

function get_leaderboard(req, res) {
  DB.get_all_scores(res);
}

function wipe_db(req, res) {
  console.log('wipe');
  DB.wipe();
  res.sendStatus(200);
}

