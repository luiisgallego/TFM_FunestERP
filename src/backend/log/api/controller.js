'use strict';

let logModel = require('./log_model');

function getService(num) {
    let nombre;

    if (num === 0) {
        nombre = 'DEFUNCION';
    } else if (num === 1) {
        nombre = 'CLIENTE';
    } else if (num === 2) {
        nombre = 'FAMILIA';
    } else {
        nombre = 'UNKNOWN'
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

        // Traducir el numero a su nombre real
        data.service = getService(data.service);

        logModel.create(data)
            .then(log => {
                console.log(log);
                res.status(204).type('json').send();
            })
            .catch(err => {
                res.status(404).type('json').send({'error': err.message});
            });
    });
}

function read(req, res) {

    return new Promise(() => {
        let servicio = req.params.servicio;

        if (!servicio) {
            const message = {'error': 'Falta parámetro sevicio'};
            return res.status(404).type('json').send(message);
        }

        // Traducir el numero a su nombre real
        let service = getService(parseInt(servicio));

        logModel.find({service: service})
            .then(logs => {
                if (!logs) return res.status(200).type('json').send({'error': 'Servicio no encontrado'});
                return res.status(200).type('json').send(logs);
            })
            .catch(err => {
                return res.status(404).type('json').send({'error': err.message});
            });
    });
}

module.exports = {
    status,
    read,
    create
};

