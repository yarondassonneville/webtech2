var express = require('express');
var mongoose = require('mongoose');
var bodyParser = require('body-parser')
var jade = require('jade');

mongoose.connect('mongodb://localhost/chat');

var app = express();

app.set('view engine', 'jade');

app.use(bodyParser.json());
app.use('/', require('./routers/index'));
app.use('/messages', require('./routers/messages'));

app.listen(3000, function () {
  console.log('Example app listening on port 3000!');
});