var http = require('http');
var Router = require('node-router');
const Database = require('./database.js');
var bodyParser = require('body-parser');

var router = Router();
var route = router.push;
var DB = new Database();

var server = http.createServer(router).listen(process.env.PORT || 3000);


route('GET',  '/leaderboard/top_5', get_top_5);
route('GET',  '/leaderboard/top_10', get_top_10);
route('GET',  '/leaderboard', get_leaderboard);
route('POST', '/leaderboard', bodyParser.urlencoded({extended: false}));

route(function (req, res, next) {
    console.log(req.body);
    var body = JSON.parse(JSON.stringify(req.body));

    var score = body.score;
    var name = body.name;
    console.log(score);
    console.log(name);

    if(score && name) {
        DB.write(score, name);
        res.send(200);
    } else {
        res.send(422);
    }
});

function get_leaderboard(req, res, next) {
    var data = DB.read();
    res.send(data);
}

function get_top_5(req, res, next) {
    var data = DB.top_5();
    res.send(data);
}

function get_top_10(req, res, next) {
    var data = DB.top_10();
    res.send(data);
}

