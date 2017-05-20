var mongoose = require('mongoose');
var bcrypt = require('bcryptjs');
var Schema = mongoose.Schema;

var UserSchema = new Schema({
    local: {
        email        : String,
        password     : String
    },
    gmail: {
        id           : String,
        token        : String,
        email        : String,
        name         : String
    },
    facebook: {
        id           : String,
        token        : String,
        email        : String,
        name         : String
    },
    twitter: {
        id           : String,
        token        : String,
        email        : String,
        name         : String
    }
})

UserSchema.methods.hashPassword = function (password) {
    return new Promise((resolve, reject) => {
        bcrypt.genSalt(10, function(err, salt) {
            bcrypt.hash(password, salt, function(err, hash) {
                resolve(hash);
            });
        });
    });
}

module.exports = mongoose.model('User', UserSchema);