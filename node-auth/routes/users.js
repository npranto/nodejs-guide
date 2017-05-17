var express = require('express');
var router = express.Router();
var multer = require('multer');
var upload = multer({ dest: 'uploads/' });

/* GET users listing. */
router.get('/', function(req, res, next) {
    res.send('respond with a resource');
});

router.get('/login', function(req, res, next) {
    res.render('login', {title: 'Login'});
});

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
        }

    // creating new user object
    console.log('CREATING NEW USER OBJECT...');
    var newUser = {
        name: req.body.name,
        username: req.body.username,
        email: req.body.email,
        password: req.body.password,
        confirmPassword: req.body.confirmPassword,
        avatar: getAvatarFilename()
    }

    console.log('SUCCESS! NEW USER CREATED...', newUser);
});

module.exports = router;
