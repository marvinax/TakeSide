// Fundamental
var express = require('express');
var path = require('path');
var favicon = require('serve-favicon');
var logger = require('morgan');
var cookieParser = require('cookie-parser');
var bodyParser = require('body-parser');

var routes = require('./routes/index');
var users = require('./routes/users');

var loki = require('lokijs');
var swig = require('swig')

var sign = require('wx_jsapi_sign');
var config = require('./config.js')();

var router = express.Router();

var app = express();

var docs;
var db = new loki('./data.json', {
  autosave: true,
  autosaveInterval: 5000,
  autoload: false,
  autoloadCallback : function(){  
    if (db.collections === []) {
      db.addCollection('docs');
    }
    docs = db.getCollection('docs');
  }
});

app.engine('html', swig.renderFile);

app.set('view engine', 'html');
app.set('views', __dirname + '/views');
app.set('port', process.env.PORT || 80);
app.use(logger('dev'));

app.use(bodyParser.json({limit: '50mb'}));
app.use(bodyParser.urlencoded({limit: '50mb', extended: true}));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));



app.get('/', function(req, res){
  res.render('index');
});

app.get('/loadmore', function(req, res){
  console.log('here');
  res.json(docs.get(docs.maxId - parseInt(req.query.load)));
})

app.post("/upload", function (req, res){

  docs.insert({
    image : req.body.image
  })

  res.json({upload : "successfully"});
});

app.get('/wechat', function(req, res){
  var url = req.query.url;
  console.log(req.query);
  sign.getSignature(config)(url, function(error, result) {
        if (error) {
            console.log(error);
            res.json({
                'error': error
            });
        } else {
            res.json(result);
        }
    });
});

module.exports = app;
