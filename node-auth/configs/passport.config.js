var LocalStrategy = require('passport-local').Strategy;
var User = require('./../models/User.js');
var bcrypt = require('bcryptjs');

var passportConfig = {
    passportLocalStrategy(passport) {
        passport.use(new LocalStrategy(
            function(username, password, done) {
                console.log('Username', username);
                console.log('Password', password);
                User.findOne({ username: username }, function (err, user) {
                    if (err) {
                        console.log('ERR', err);
                        return done(err);
                    }
                    if (!user) {
                        console.log('Incorrect username');
                        return done(null, false, { message: 'Incorrect username.' });
                    }
                    if (user && !passwordVerified(password, user.password)) {
                        console.log('USER: ', user, passwordVerified(password, user.password));
                        return done(null, false, { message: 'Incorrect password.' });
                    }
                    return done(null, user);
                });
            }
        ))
    }
}

// helper functions
var passwordVerified = function(candidatePassword, hashedPassword){
    return bcrypt.compare(candidatePassword, hashedPassword).then((res) => {
        if (res){
            return true;
        }
        return false;
    });
}


module.exports = passportConfig;

