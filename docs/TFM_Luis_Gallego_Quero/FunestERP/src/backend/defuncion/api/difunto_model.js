'use strict';

let mongoose = require('mongoose'),
    moment = require('moment');

/**
 * @description Difunto MongoDB Schema
 *
 */
let difuntoSchema = new mongoose.Schema({
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
    sexo: {
        type: String,
        enum: ['Hombre', 'Mujer']
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
    fechaNacimiento: {
        type: String
    },
    estadoCivil: {
        type: String,
        enum: ['soltero', 'casado', 'comprometido', 'enRelacion', 'unionLibre',
            'separado', 'divorciado', 'viudo', 'noviazgo']
    },
    nombreParejaCivil: {
        type: String
    },
    nombrePadre: {
        type: String
    },
    nombreMadre: {
        type: String
    },
    cliente: {
        type: mongoose.Schema.Types.ObjectId
    },
    familia: {
        type: mongoose.Schema.Types.ObjectId
    },
    factura: {
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

difuntoSchema.path('DNI')
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

module.exports = mongoose.model('difunto', difuntoSchema);
