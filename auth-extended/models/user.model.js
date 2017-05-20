var mongoose = require('mongoose');
var bcrypt = require('bcryptjs');
var Schema = mongoose.Schema;

var UserSchema = new Schema({
    name: {
        type: String,
        required: String,
    },
    username: {
        type: String,
        required: String,
    },
    local: {
        email: {
            type: String,
            required: String,
            unique: true
        },
        password: {
            type: String,
            required: String,
        }
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

UserSchema.methods.hashPassword = function () {

}

module.exports = mongoose.model('User', UserSchema);