'use strict';

let mongoose = require('mongoose');


/**
 * @description User MongoDB Schema
 *
 */
let userSchema = new mongoose.Schema({
    _id: {
        type: mongoose.Schema.ObjectId,
        default: mongoose.Types.ObjectId()
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
        type: Date,
        default: Date.now
    },
    updatedAt: {
        type: Date
    }
}, {
    versionKey: false
});


module.exports = mongoose.model('user', userSchema);
