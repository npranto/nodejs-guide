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
                    if (user) {
                        // checking candidate password
                        bcrypt.compare(password, user.password).then((res) => {
                            if (res === true){
                                console.log('USER: ', user);
                                return done(null, user, { message: 'Welcome!' });
                            }else{
                                console.log('Incorrect password');
                                return done(null, false, { message: 'Incorrect password.' });
                            }
                        });
                    }
                });
            }
        ))

        passport.serializeUser(function(user, done) {
            done(null, user.id);
        });

        passport.deserializeUser(function(id, done) {
            User.findById(id, function(err, user) {
                done(err, user);
            });
        });
    }
}



module.exports = passportConfig;

