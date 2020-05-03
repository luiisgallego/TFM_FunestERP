'use strict';

let mongoose = require('mongoose'),
    moment = require('moment');

/**
 * @description Cliente MongoDB Schema
 *
 */
let clienteSchema = new mongoose.Schema({
    _id: {
        type: mongoose.Schema.Types.ObjectId,
        auto: true
    },
    nombre: {
        type: String,
        required: true
    },
    DNI: {
        type: String,
        required: true,
        unique: true
    },
    poblacion: {
        type: String
    },
    provincia: {
        type: String
    },
    calle: {
        type: String
    },
    numero: {
        type: Number
    },
    bloque: {
        type: Number
    },
    portal: {
        type: String
    },
    codigoPostal: {
        type: Number
    },
    telefono: {
        type: String
    },
    email: {
        type: String
    },
    cuentaBancaria: {
        type: String
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

clienteSchema.path('DNI')
    .validate(function(value) {
        return new Promise((resolve, reject) => {
            this.constructor.findOne({ DNI: value })
                .then(model => {
                    if (model.DNI) reject(new Error('DNI en uso'));
                    resolve(true);
                })
                .catch(err => { resolve(err); });
        });
});

// TODO: validar teléfono = 9 dígitos
// TODO: validar cuenta bancaria (longitud)

module.exports = mongoose.model('cliente', clienteSchema);
