// Fundamental
var express = require('express');
var path = require('path');
var cookieParser = require('cookie-parser');
var bodyParser = require('body-parser');

var app = express();

app.set('views', __dirname + '/views');
app.set('port', process.env.PORT || 8080);

app.use(bodyParser.json({limit: '50mb'}));
app.use(bodyParser.urlencoded({limit: '50mb', extended: true}));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));


app.get('/', function(req, res){
  res.sendFile('index-real.html',  {
     root:  __dirname + '/views'
   });
});

app.get('/company', function(req, res){
  res.sendFile('company.html', {
     root:  __dirname + '/views'
   });
});

app.get('/products', function(req, res){
  res.sendFile('products.html', {
     root:  __dirname + '/views'
   });
});

module.exports = app;
