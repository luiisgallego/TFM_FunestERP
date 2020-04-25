'use strict';

let mongoose = require('mongoose'),
    moment = require('moment');

/**
 * @description Servicio MongoDB Schema
 *
 */
let servicioSchema = new mongoose.Schema({
    _id: {
        type: mongoose.Schema.Types.ObjectId,
        auto: true
    },
    fechaDefuncion: {
        type: String
    },
    fechaEntierro: {
        type: String
    },
    fechaMisa: {
        type: String
    },
    poblacionEntierro: {
        type: String
    },
    tanatorio: {
        type: String,
        enum: ['sala1', 'sala2', 'sala3', 'no']
    },
    tipoServicio: {
        type: String,
        enum: ['particular', 'compania', 'recepcion']
    },
    compania: {
        type: String,
        enum: ['preventiva', 'mapfre', 'ocaso', 'santalucia']
    },
    incineracion: {
        type: Boolean
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

servicioSchema.path('compania')
    .validate(function (value) {
        return new Promise((resolve, reject) => {
            if (this.tipoServicio === 'particular') {
                console.log('particular');
                if (value.length > 0) reject(new Error('Un particular no puede tener compania'));
                resolve(true);
            } resolve(true);
        });
});


module.exports = mongoose.model('servicio', servicioSchema);
