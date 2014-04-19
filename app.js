#!/usr/bin/env node
"use strict";

require('newrelic');

var express = require('express');
var routes = require('./routes');
var mongoose = require('mongoose'),
    http = require('http'),
    path = require('path');

var app = express();

// all environments
app.set('port', process.env.PORT || 5000);
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'jade');
app.use(express.favicon());
app.use(express.logger('dev'));
app.use(express.json());
app.use(express.urlencoded());
app.use(express.methodOverride());
app.use(express.cookieParser(process.env.COOKIE_PARSER_SECRET));
app.use(express.session());
app.use(app.router);
app.use(express.static(path.join(__dirname, 'public')));

// development only
if ('development' == app.get('env')) {
  app.use(express.errorHandler());
}

var uristring =
    process.env.MONGOLAB_URI ||
    process.env.MONGOHQ_URL ||
    'mongodb://localhost/citba-rss';

// connect to db
var connect = function () {
  var options = { server: { socketOptions: { keepAlive: 1 } } };
  mongoose.connect(uristring, options, function (err, res) {
    if (err) {
      console.log ('ERROR connecting to: ' + uristring + '. ' + err);
    } else {
      console.log ('Succeeded connected to: ' + uristring);
    }
  });
};
connect();

// Error handler
mongoose.connection.on('error', function (err) {
  console.error(err);
});

// Reconnect when closed
mongoose.connection.on('disconnected', function () {
  connect();
});

/*
setInterval(function(err) {
  if (err) { console.error(err); }

  console.log("Getting new contents ... ");
  routes.get_rss_content();
}, 15 * 1000);
*/

app.get('/', routes.index);
app.get('/ba.xml', routes.ba);
app.get('/job.xml', routes.job);

http.createServer(app).listen(app.get('port'), function(){
  console.log('Express server listening on port ' + app.get('port'));
});
