'use strict';

let winston = require('winston');
require('winston-mongodb');

let logger = winston.createLogger({
    level: 'info',
    format: winston.format.json(),
    transports: [
        new winston.transports.Console(),
        new winston.transports.MongoDB({
            db: 'mongodb://localhost:27017/log',
            collection : 'test'
        })
    ]
});

function status(req, res) {

    // Mostramos status OK
    let data = { "status" : "OK" };
    res.status(200).type('json').send(data);
}

async function create(req, res) {

    return new Promise(() => {

        let data = {
            'name': 'Luis',
            'apellido': 'Gallego'
        };

        logger.info(data);
        logger.error(data);

        res.status(200).send();
    });
}

function read(req, res) {

}

module.exports = {
    status,
    read,
    create
};

