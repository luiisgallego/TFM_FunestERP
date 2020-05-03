'use strict';

let mongoose = require('mongoose'),
    moment = require('moment'),
    crypto = require('crypto');


/**
 * @description User MongoDB Schema
 *
 */
let userSchema = new mongoose.Schema({
    _id: {
        type: mongoose.Schema.Types.ObjectId,
        auto: true,
    },
    username: {
        type: String,
        required: true,
        unique: true
    },
    password: {
        type: String,
        required: true
    },
    email: {
        type: String,
        required: true,
        unique: true
    },
    name: {
        type: String
    },
    rol: {
        type: String,
        enum: ['admin', 'user'],
        default: 'user'
    },
    createdAt: {
        type: String,
        default: moment().format()
    },
    updatedAt: {
        type: String
    },
    salt: {
        type: String
    }
}, {
    versionKey: false
});

userSchema.path('username')
    .validate(function(value) {
        return new Promise((resolve, reject) => {
            this.constructor.findOne({ username: value })
                .then(model => {
                    if (model.username) reject(new Error('username en uso'));
                    resolve(true);
                })
                .catch(err => { resolve(err); });
        });
});

userSchema.path('email')
    .validate(function(value) {
        return new Promise((resolve, reject) => {
            this.constructor.findOne({ email: value })
                .then(model => {
                    if (model.email) reject(new Error('email en uso'));
                    resolve(true);
                })
                .catch(err => { resolve(err); });
        });
});

userSchema.methods.setPassword = function(password) {
    this.salt = crypto
        .randomBytes(16)
        .toString('hex');
    this.password = crypto
        .pbkdf2Sync(password, this.salt, 10000, 512, 'sha512')
        .toString('hex');
};

userSchema.methods.validatePassword = function(password) {
    const hash = crypto
        .pbkdf2Sync(password, this.salt, 10000, 512, 'sha512')
        .toString('hex');
    return this.password === hash;
};

module.exports = mongoose.model('user', userSchema);
