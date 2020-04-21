'use strict';

let mongoose = require('mongoose');


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
        type: Date
    },
    fechaEntierro: {
        type: Date
    },
    fechaMisa: {
        type: Date
    },
    poblacionEntierro: {
        type: String
    },
    tanatorio: {
        type: String,
        enum: ['sala1', 'sala2', 'sala3']
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
    createdAt: {
        type: Date,
        default: Date.now
    },
    createdBy: {
        type: mongoose.Schema.Types.ObjectId
    },
    updatedAt: {
        type: Date
    },
    updatedBy: {
        type: mongoose.Schema.Types.ObjectId
    }
}, {
    versionKey: false
});

// servicioSchema.path('compania').validate(function (compania, response) {
//     if (this.constructor.tipoServicio === 'particular') {
//         if (!compania.length) {
//             return response('Un particular no puede tener compania');
//         } else {
//             return response(true);
//         }
//     }
//
// });


module.exports = mongoose.model('defuncion', servicioSchema);
