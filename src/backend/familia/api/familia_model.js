'use strict';

let mongoose = require('mongoose'),
    moment = require('moment');

/**
 * @description Arbol Schema
 *
 */
let arbolSchema = new mongoose.Schema({
    rol: {
        type: String,
        required: true
    },
    values: {
        type: [String],
        required: true
    }
});

/**
 * @description Familia MongoDB Schema
 *
 */
let familiaSchema = new mongoose.Schema({
    _id: {
        type: mongoose.Schema.Types.ObjectId,
        auto: true
    },
    arbol: {
        type: [arbolSchema],
        required: true
    },
    difunto: {
        type: mongoose.Schema.Types.ObjectId
    },
    createdAt: {
        type: String,
        default: moment().format()
    },
    createdBy: {
        type: mongoose.Schema.Types.ObjectId
    },
    updatedAt: {
        type: String
    },
    updatedBy: {
        type: mongoose.Schema.Types.ObjectId
    }
}, {
    versionKey: false
});

familiaSchema.path('arbol')
    .validate(function(value) {
        return new Promise((resolve, reject) => {
            if (value.length === 0) return reject(new Error('Necesitamos algun familiar'));
            return resolve(true);
        });
});


module.exports = mongoose.model('familia', familiaSchema);
