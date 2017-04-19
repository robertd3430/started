var express = require('express');
var path = require('path');
var logger = require('morgan');
var cookieParser = require('cookie-parser');
var bodyParser = require('body-parser');

// starts a new mongoose connection
var db = require("./db");

var routes = require('./routes/movies_controller');
var api_routes = require('./routes/api_controller');

var app = express();

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs');

app.use(logger('dev'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));
app.use('/dist', express.static(path.join(__dirname, 'dist'))); // so the browser can recognize static files compiled/transpiled from react components, and do so from the /dist path. only needed in production since webpack dev server doesn't use an actual file...

app.use('/', routes);
app.use('/', api_routes);

// when using react browserHistory, anchor all requests relative to one page to fix path issues (e.g. don't post to /robots/1234/api/robots/1234/update)
// this is not the code that tells react which page to use.
// this requires AJAX requests to use "/" preceding the request url (e.g. "/api/robots" instead of "api/robots")
// this enables proper requests from both the root url ("/") as well as from nested urls (e.g. "/robots/123")
//app.get('*', function (request, response){
//  response.sendFile(path.resolve(__dirname, 'views', 'robots', 'index.ejs'))
//})

// catch 404 and forward to error handler
app.use(function(req, res, next) {
  var err = new Error('Not Found');
  err.status = 404;
  next(err);
});

// error handlers

app.use(function(err, req, res, next) {
  res.status(err.status || 500);
  res.render('error', {
    message: err.message,
    error: {}
  });
});


module.exports = app;
