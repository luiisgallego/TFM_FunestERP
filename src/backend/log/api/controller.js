'use strict';

let winston = require('winston');
require('winston-mongodb');

let uri_localhost = "mongodb://localhost:27017/log";

let logger = winston.createLogger({
    level: 'info',
    format: winston.format.json(),
    transports: [
        new winston.transports.Console(),
        new winston.transports.MongoDB({
            db: uri_localhost,
            collection : 'test',
        })
    ]
});

function getService(num) {
    let nombre;

    if (num === 0) {
        nombre = 'defuncion'
    } else if (num === 1) {
        nombre = 'cliente'
    } else if (num === 2) {
        nombre = 'familia'
    } else {
        nombre = 'unknown'
    }

    return nombre
}

function status(req, res) {

    // Mostramos status OK
    let data = { "status" : "OK" };
    res.status(200).type('json').send(data);
}

async function create(req, res) {

    return new Promise(() => {
        let data = req.body;

        if (Object.keys(data).length === 0) {
            const message = {'error': 'Peticion vacia'};
            return res.status(404).type('json').send(message)
        }

        data['service'] = getService(data['service']);
        logger.info(data);
        res.status(200).type('json').send();
    });
}

module.exports = {
    status,
    create
};

