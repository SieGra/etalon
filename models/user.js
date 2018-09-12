'use strict';
const mongoose = require('mongoose');
const bcrypt = require('bcrypt');

const UserSchema = new mongoose.Schema({
    name: {
        type: String,
        unique: true,
        trim: true,
        required: true
    },
    email: {
        type: String,
        unique: true,
        required: true,
        trim: true
    },
    
    password: {
        type: String,
        required: true
    }

});

// Userauthentication
UserSchema.statics.authenticate = function(email, password, callback){
    User.findOne({email: email})
    .exec(function(error, user){
        if(error){
            return callback(error);

        } else if(!user) {

            let err = new Error('We could not find you in the database.');
            err.status = 401;
            return callback(err)
        }

        bcrypt.compare(password, user.password, function(err, result){
            if(result === true) {
                return callback(null, user)
            } else {
                return callback();
            }
        });
    });

}

// Hash the passwords
UserSchema.pre('save', function ( next ) {
    let user = this;
    bcrypt.hash(user.password, 10, (err, hash)=> {
        if(err) {
            return next(err);
        } else {
            user.password = hash;
            next();
        }
    });

});

// Make into a model
let User = mongoose.model('User', UserSchema);
module.exports = User;
