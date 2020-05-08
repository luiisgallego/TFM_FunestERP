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
        type: [mongoose.Schema.Types.ObjectId]
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
                // No puede haber dos DNIs iguales en el sistema actualmente
                .then(model => {
                    // Debemos permitir actualizar la entrada que contenga el propio DNI
                    if (model._id.toString() !== this._id.toString()) {
                        return reject(new Error('DNI en uso'));
                    }
                    return resolve(true);
                })
                .catch(err => { return resolve(err); });
        });
});

clienteSchema.path('telefono')
    .validate(function(value) {
        return new Promise((resolve, reject) => {
            if (value.length !== 9) return reject(new Error('Telefono incorrecto'));
            return resolve(true);
        });
});

clienteSchema.path('cuentaBancaria')
    .validate(function(value) {
        return new Promise((resolve, reject) => {
            if (value.length !== 24) return reject(new Error('Numero de cuenta incorrecto'));
            return resolve(true);
        });
});


module.exports = mongoose.model('cliente', clienteSchema);
