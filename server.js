const Database = require('./database.js');

var DB = new Database();

const express = require('express')
const app = express()
app.use(express.urlencoded({extended: true})); // to support URL-encoded bodies

app.listen(process.env.PORT || 3000, () => console.log('Example app listening on port 3000!'))

app.get('/', (req, res) => res.send('Hello World!'))
app.get('/leaderboard', get_leaderboard);
app.get('/leaderboard/top_5', get_top_5);
app.post('/leaderboard/', write_score);

function write_score(req, res) {
    console.log("body: " + req.body);
    var score = req.body.score;
    var name = req.body.name;
    console.log("score: " + score);
    console.log("name: " + name);

    if(score != null && name != null) {
        DB.write(score, name);
        res.sendStatus(200);
    } else {
        res.sendStatus(422);
    }
}

function get_leaderboard(req, res) {
    var data = DB.read();
    res.send(data);
}

function get_top_5(req, res) {
    var data = DB.top_5();
    res.send(data);
}

