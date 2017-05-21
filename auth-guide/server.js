
// import all packages needed
var express  = require('express');
var mongoose = require('mongoose');
var passport = require('passport');
var flash = require('connect-flash');
var morgan = require('morgan');
var cookieParser = require('cookie-parser');
var bodyParser = require('body-parser');
var session = require('express-session');



// import local files needed
var databaseConfig = require('./config/database.js');
var passportConfig = require('./config/passport.js');
var sessionConfig = require('./config/session.js');
var rootRoutes = require('./app/routes.js');



// initialize local packages, variables, and configurations
var port = process.env.PORT || 3000;
var app = express();
passportConfig(passport); // pass passport for configuration




// configuration ===============================================================
mongoose.connect(databaseConfig.uri); // connect to our database
mongoose.connection.once('open', function () {
    console.log('MongoDB running on ' + databaseConfig.uri);
})



app.set('view engine', 'ejs'); // set up ejs for templating



// set up our express application
app.use(morgan('dev')); // log every request to the console
app.use(cookieParser()); // read cookies (needed for auth)
app.use(bodyParser.json()); // get information from html forms
app.use(bodyParser.urlencoded({ extended: true }));
// required for passport
app.use(session(sessionConfig));
app.use(passport.initialize());
app.use(passport.session()); // persistent login sessions
app.use(flash()); // use connect-flash for flash messages stored in session



// routes ======================================================================
rootRoutes(app, passport); // load our routes and pass in our app and fully configured passport



// launch ======================================================================
app.listen(port, function () {
    console.log('The magic happens on port ' + port);
});
