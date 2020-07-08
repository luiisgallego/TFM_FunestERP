'use strict';

let mongoose = require('mongoose'),
    moment = require('moment');

/**
 * @description Log MongoDB Schema
 *
 */
let logSchema = new mongoose.Schema({
    _id: {
        type: mongoose.Schema.Types.ObjectId,
        auto: true
    },
    service: {
        type: String,
        enum: ['DEFUNCION', 'CLIENTE', 'FAMILIA', 'UNKNOWN'],
        default: 'UNKNOWN'
    },
    method: {
        type: String,
        enum: ['GET', 'POST', 'PUT', 'DELETE', 'UNKNOWN'],
        default: 'UNKNOWN'
    },
    route: {
        type: String
    },
    time: {
        type: String
    },
    status: {
        type: Number,
    },
    input: {},
    output: {},
    createdAt: {
        type: String,
        default: moment().format()
    }
}, {
    versionKey: false
});


module.exports = mongoose.model('log', logSchema);
