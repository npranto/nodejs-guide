var express = require('express');
var router = express.Router();
var multer = require('multer');
var upload = multer({ dest: 'uploads/' });
var bcrypt = require('bcryptjs');
var passport = require('passport');

var User = require('./../models/User.js');

/* GET users listing. */
router.get('/', function(req, res, next) {
    res.send('respond with a resource');
});

router.get('/login', function(req, res, next) {
    res.render('login', {title: 'Login'});
});

router.post('/login',
    passport.authenticate('local', {
        failureRedirect: '/users/login',
        failureFlash: 'Oops! Invalid username or password',
    }), function(req, res) {
        console.log('REQ.USER: ', req.user);
        if (req.user){
            res.redirect('/users/'+req.user.id+'/dashboard');
        }
    }
);

router.get('/register', function(req, res, next) {
    res.render('register', {title: 'Register'});
});

router.post('/register', upload.single('avatar'), function(req, res, next) {
    console.log('REGISTERING NEW USER...');

    // register form validator
    console.log('VALIDATING NEW USER REGISTER FORM...');
    // validating avatar upload
    var getAvatarFilename = function() {
        var avatarFilename = 'default.png';
        if (req.file){
            avatarFilename = req.file.filename;
        }
        return avatarFilename;
    }
    // validating text/password input fields
    req.checkBody('name', 'Name field must not be empty').notEmpty();
    req.checkBody('username', 'Username field must not be empty').notEmpty();
    req.checkBody('email', 'Please enter a valid email').isEmail();
    req.checkBody('password', 'Password field must not be empty').notEmpty();
    req.checkBody('confirmPassword', 'Passwords do not match').equals(req.body.password);

    // check errors after form validation
    var errors = req.validationErrors();
    if (errors){
        console.log('ERROR IN NEW USER REGISTER FORM');
        res.render('register', {
            title: 'Register',
            errors: errors
        })
    }else {
        console.log('NO ERRORS IN NEW USER REGISTER FORM');
        // creating new user object
        console.log('CREATING NEW USER OBJECT...');
        var newUser = new User({
            name: req.body.name,
            username: req.body.username,
            email: req.body.email,
            password: req.body.password,
            avatar: getAvatarFilename()
        });
        bcrypt.genSalt(10, function(err, salt) {
            bcrypt.hash(newUser.password, salt, function(err, hash) {
                // save newUser to the database
                newUser.password = hash;
                newUser.save(function(err, userCreated){
                    if (err) {
                        console.log('ERROR IN SAVING NEW USER TO DATABASE: ', err);
                        return res.status(500).json(err);
                    }
                    console.log('NEW USER SAVED TO DATABASE: ', userCreated);
                    // res.location('/');
                    res.redirect('/users/1/dashboard');
                    // return res.status(201).json(userCreated);
                })
            });
        });

    }

    console.log('SUCCESS! NEW USER CREATED...', newUser);
});

router.get('/:id/dashboard', function(req, res, next) {
    res.render('dashboard', {title: 'Dashboard'});
});


module.exports = router;
