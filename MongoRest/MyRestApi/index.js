var express = require('express');
var bodyParser = require('body-parser');
var cors = require('cors');
var news = require('./base/base.js');

var app = express();
var port = 3000;

app.use(bodyParser.urlencoded({ extended: true}));
app.use(bodyParser.json());
app.use(cors());

app.listen(port, function(){

    console.log('server run is ' + port);

});

app.get('/news', function(req, res){

    res.send(news.allNews());

});

app.get('/news/:id', function(req, res){

    var el_id = req.params.id;
    res.send(news.oneNew(el_id));

});

app.post('/news', function(req, res){
    
    console.log(req.params);

});