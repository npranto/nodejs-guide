// import all packages needed
var express = require('express');
var path = require('path');
var favicon = require('serve-favicon');
var morgan = require('morgan');
var cookieParser = require('cookie-parser');
var bodyParser = require('body-parser');
var mongoose = require('mongoose');
var passport = require('passport');
var flash = require('connect-flash');
var session = require('express-session');



// import local files needed
var rootRoutes = require('./routes/index.route');
var databaseConfig = require('./config/database.config');
var passportConfig = require('./config/passport.config');
var sessionConfig = require('./config/session.config');



// initialize local packages, variables, and configurations
var app = express();
// passportConfig(passport); // pass passport for configuration



// database configuration
mongoose.connect(databaseConfig.uri);    // connect to the local database
mongoose.connection.once('open', function(){
    console.log('Successfully connected to mongodb...');
});


// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'pug');



// express middleware configurations
// uncomment after placing your favicon in /public
//app.use(favicon(path.join(__dirname, 'public', 'favicon.ico')));
app.use(morgan('dev'));   // log every request to the console
app.use(bodyParser.json());   // get information from html forms
app.use(bodyParser.urlencoded({ extended: false }));
app.use(cookieParser());    // read cookies (needed for auth)
app.use(express.static(path.join(__dirname, 'public')));
// required for passport
app.use(session(sessionConfig)); // session secret
app.use(passport.initialize());
app.use(passport.session()); // persistent login sessions
app.use(flash()); // use connect-flash for flash messages stored in session



// setup routes
rootRoutes(app, passport);


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
