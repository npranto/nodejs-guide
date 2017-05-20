var express = require('express');
var router = express.Router();



// =====================================
// LOGIN ===============================
// =====================================
// render login view
router.get('/login', function(req, res, next) {
    // render the page and pass in any flash data if it exists
    res.render('login', {
        title: 'Login'
        // message: req.flash('loginMessage')
    });
});

// process the login form
// app.post('/login', do all our passport stuff here);



// =====================================
// SIGNUP ===============================
// =====================================
// render signup view
router.get('/signup', function(req, res, next) {
    res.render('signup', {
        title: 'Sign Up'
    });
});

// process the signup form
// router.post('/signup', do all our passport stuff here)



// =====================================
// PROFILE SECTION =====================
// =====================================
// we will want this protected so you have to be logged in to visit
// we will use route middleware to verify this (the isLoggedIn function)
router.get('/dashboard', function(req, res) {
    res.render('dashboard', {
        title: 'Dashboard',
        user : req.user // get the user out of session and pass to template
    });
});



// =====================================
// LOGOUT ==============================
// =====================================
router.get('/logout', function (req, res, next) {
    req.logout();
    res.redirect('/');
})


// route middleware to make sure a user is logged in
function isLoggedIn(req, res, next) {
    // if user is authenticated in the session, carry on
    if (req.isAuthenticated())
        return next();

    // if they aren't, redirect them to the home page
    res.redirect('/');
}



module.exports = router;
