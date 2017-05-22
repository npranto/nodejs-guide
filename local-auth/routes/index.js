var express = require('express');
var router = express.Router();
var userRoutes = require('./users.js');

var indexRoutes = function (app) {

    /* GET home page. */
    router.get('/', function(req, res, next) {
      res.render('index', { title: 'Express' });
    });

    app.use('/users', userRoutes(app));

    return router;

}

module.exports = indexRoutes;
