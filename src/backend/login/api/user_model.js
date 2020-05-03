'use strict';

let mongoose = require('mongoose'),
    moment = require('moment');


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
    }
}, {
    versionKey: false
});


module.exports = mongoose.model('user', userSchema);
