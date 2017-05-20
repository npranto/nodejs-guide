var express = require('express');
var passport = require('passport');


module.exports = function (app, passport) {
    // =====================================
    // LOGIN ===============================
    // =====================================
    // render login view
    app.get('/users/login', function(req, res, next) {
        // render the page and pass in any flash data if it exists
        res.render('login', {
            title: 'Login'
            // message: req.flash('loginMessage')
        });
    });

    // process the login form
    // app.post('/users/login', do all our passport stuff here);



    // =====================================
    // SIGNUP ===============================
    // =====================================
    // render signup view
    app.get('/users/signup', function(req, res, next) {
        res.render('signup', {
            title: 'Sign Up'
        });
    });

    // process the signup form
    app.post('/users/signup', passport.authenticate('local-signup', {
        successRedirect : '/users/dashboard', // redirect to the secure profile section
        failureRedirect : '/users/login', // redirect back to the signup page if there is an error
        failureFlash : true // allow flash messages
    }))



    // =====================================
    // PROFILE SECTION =====================
    // =====================================
    // we will want this protected so you have to be logged in to visit
    // we will use route middleware to verify this (the isLoggedIn function)
    app.get('/users/dashboard', isLoggedIn, function(req, res) {
        res.render('dashboard', {
            title: 'Dashboard',
            user : req.user // get the user out of session and pass to template
        });
    });



    // =====================================
    // LOGOUT ==============================
    // =====================================
    app.get('/users/logout', function (req, res, next) {
        req.logout();
        res.redirect('/');
    })

}

// route middleware to make sure a user is logged in
function isLoggedIn(req, res, next) {
    // if user is authenticated in the session, carry on
    if (req.isAuthenticated())
        return next();

    // if they aren't, redirect them to the home page
    res.redirect('/');
}




