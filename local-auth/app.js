var express = require('express');
var path = require('path');
var favicon = require('serve-favicon');
var logger = require('morgan');
var flash = require('connect-flash');
var cookieParser = require('cookie-parser');
var bodyParser = require('body-parser');
var mongoose = require('mongoose');
var passport = require('passport');
var session = require('express-session');

var databaseConfig = require('./configs/database.js');
var sessionConfig = require('./configs/session.js');
var indexRoutes = require('./routes/index.js');

var app = express();



// configuring the database
mongoose.connect(databaseConfig.uri);
// mongoose.connection.once('error', function(){
//   console.error.bind(console, 'connection error :( :')
// });
mongoose.connection.once('open', function() {
    console.log('Connected to MongoDB :)');
});


// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'pug');

// uncomment after placing your favicon in /public
//app.use(favicon(path.join(__dirname, 'public', 'favicon.ico')));
app.use(logger('dev'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));
// configuring passport
app.use(session(sessionConfig));
app.use(passport.initialize());
app.use(passport.session());
app.use(flash());


// indexRoutes(app);
app.use('/', indexRoutes(app, passport));

// catch 404 and forward to error handler
app.use(function(req, res, next) {
  var err = new Error('Not Found');
  err.status = 404;
  next(err);
});

// error handler
app.use(function(err, req, res, next) {
  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get('env') === 'development' ? err : {};

  // render the error page
  res.status(err.status || 500);
  res.render('error');
});

module.exports = app;
