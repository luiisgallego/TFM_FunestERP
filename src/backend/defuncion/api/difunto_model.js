'use strict';

let mongoose = require('mongoose');


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
        type: Date
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


module.exports = mongoose.model('difunto', difuntoSchema);
