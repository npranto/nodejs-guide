var express = require('express');
var router = express.Router();
var userRoutes = require('./users.js');

var indexRoutes = function (app, passport) {

    /* GET home page. */
    router.get('/', function(req, res, next) {
      res.render('index', { title: 'Welcome to TextAnyone!' });
    });

    app.use('/users', userRoutes(app, passport));

    return router;

}

module.exports = indexRoutes;
