var express = require("express");
var stylus = require('stylus');
var logger = require('morgan');
var bodyParser = require('body-parser');
var multer = require('multer');
var mongoose = require('mongoose');

var env = process.env.NODE_ENV = process.env.NODE_ENV || 'development';

var app = express();

function compile(str, path) {
    return stylus(str).set('filename', path);
};


app.set('views', __dirname + '/server/views');
app.set('view engine', 'jade');

app.use(logger('dev'));

// parse application/json
//app.use(bodyParser.json());                        

// parse application/x-www-form-urlencoded
//app.use(bodyParser.urlencoded({ extended: true }));

// parse multipart/form-data
//app.use(multer());

app.use(stylus.middleware({
    src: __dirname + '/public',
    compile: compile
}));
app.use(express.static(__dirname + '/public'));

mongoose.connect('mongodb://admin:fixAdmin@ds063150.mongolab.com:63150/fixdb');
var db = mongoose.connection;
db.on('error', console.error.bind(console, 'connection error...'));
db.once('open', function callback() {
    console.log('DB is opened');
});


app.get('/partials/:partialPath', function(req, res) {
    res.render('partials/' + req.params.partialPath);
});

app.get('*', function(req, res) {
    res.render('index');
});


var port = process.env.PORT || 3030;
app.listen(port);

console.log('Listening on port: ' + port + ' ...');