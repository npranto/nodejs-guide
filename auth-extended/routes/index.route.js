var express = require('express');

var userRoutes = require('./users.route');

module.exports = function (app, passport) {

    // =====================================
    // HOME PAGE (with login and signup tabs) ========
    // =====================================
    app.get('/', function(req, res) {
        // load the index.pug file
        res.render('index', {
            title: 'Home'
        })
    });

    // load userRoutes
    userRoutes(app, passport);
    // app.use('/users', userRoutes)

}
