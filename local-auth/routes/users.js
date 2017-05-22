var express = require('express');
var router = express.Router();

var userRoutes = function (app) {

    router.get('/', function(req, res, next) {
        res.render('index', { title: 'Login' });
    });

    router.get('/login', function(req, res, next) {
        res.render('index', { title: 'Login' });
    });

    router.get('/register', function(req, res, next) {
        res.render('index', { title: 'Register' });
    });

    return router;

}

module.exports = userRoutes;
