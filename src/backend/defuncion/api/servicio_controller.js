'use strict';

let merge = require('lodash.merge'),
    moment = require('moment');

let servicioModel = require('./servicio_model');

function status(req, res) {

    // Mostramos status OK
    let data = { "status" : "OK" };
    res.status(200).type('json').send(data);
}

function read(req, res) {

    return new Promise(resolve => {
        servicioModel.findById(req.params._id)
            .then(servicio => {
                if (!servicio) {
                    const message = {'error': 'Servicio no encontrado'};
                    if (res) return res.status(200).type('json').send(message);
                    resolve([200, message]);
                } else {
                    if (res) return res.status(200).type('json').send(servicio);
                    resolve([200, servicio]);
                }
            })
            .catch(err => {
                const message = {'error': err.message};
                if (res) return res.status(404).type('json').send(message);
                resolve([404, message]);
            });
    });
}

function readByDifuntoId(req, res) {

    return new Promise(resolve => {
        servicioModel.findOne({difunto: req.params.difunto})
            .then(servicio => {
                if (!servicio) {
                    const message = {'error': 'Servicio no encontrado'};
                    if (res) return res.status(200).type('json').send(message);
                    resolve([200, message]);
                } else {
                    if (res) return res.status(200).type('json').send(servicio);
                    resolve([200, servicio]);
                }
            })
            .catch(err => {
                const message = {'error': err.message};
                if (res) return res.status(404).type('json').send(message);
                resolve([404, message]);
            });
    });
}

function list(req, res) {

    return new Promise(resolve => {
        servicioModel.find()
            .then(servicios => {
                if (!servicios) {
                    const message = {'error': 'Ningun servicio encontrado'};
                    if (res) return res.status(200).type('json').send(message);
                    resolve([200, message]);
                } else {
                    if (res) return res.status(200).type('json').send(servicios);
                    resolve([200, servicios]);
                }
            })
            .catch(err => {
                const message = {'error': err.message};
                if (res) return res.status(404).type('json').send(message);
                resolve([404, message]);
            });
    });
}

function create(req, res) {

    return new Promise((resolve) => {
        if (Object.keys(req.body).length === 0) {
            const message = {'error': 'No hay parametros'};
            if (res) return res.status(404).type('json').send(message);
            resolve([404, message]);
        }

        servicioModel.create(req.body)
            .then(servicio => {
                if (res) res.status(200).type('json').send(servicio);
                else resolve([200, servicio]);
            })
            .catch(err => {
                const message = {'error': err.message};
                if (res) res.status(404).type('json').send(message);
                else resolve([404, message]);
            });
    });
}

function update(req, res) {

    return new Promise(resolve => {

        if (!req.body._id) {
            const message = {'error': 'Falta parametro _id'};
            if (res) return res.status(404).type('json').send(message);
            resolve([404, message]);
        }

        servicioModel.findById(req.body._id)
            .then(servicio => {
                if (!servicio) {
                    const message = {'error': 'Difunto no encontrado'};
                    if (res) return res.status(200).type('json').send(message);
                    resolve([200, message]);
                }

                let new_servicio = new servicioModel(merge(servicio, req.body));
                new_servicio.updatedAt = moment().format();

                new_servicio.save()
                    .then(() => {
                        if (res) return res.status(200).type('json').send(new_servicio);
                        resolve([200, new_servicio]);
                    })
                    .catch(err => {
                        const message = {'error': err.message};
                        if (res) return res.status(404).type('json').send(message);
                        resolve([404, message]);
                    });
            })
            .catch(err => {
                const message = {'error': err.message};
                if (res) return res.status(404).type('json').send(message);
                resolve([404, message]);
            });

        });
}

function destroy(req, res) {

    return new Promise(resolve => {
        servicioModel.findById(req.params._id)
            .then(servicio => {
                if (!servicio) {
                    const message = {'error': 'Servicio no encontrado'};
                    if (res) return res.status(200).type('json').send(message);
                    resolve([200, message]);
                }

                servicio.remove()
                    .then(() => {
                        if (res) return res.status(204).send();
                        resolve([204, {}]);
                    })
                    .catch((err) => {
                        const message = {'error': err.message};
                        if (res) return res.status(404).type('json').send(message);
                        resolve([404, message]);
                    });
            })
            .catch(err => {
                const message = {'error': err.message};
                if (res) return res.status(404).type('json').send(message);
                resolve([404, message]);
            });
    });
}


module.exports = {
    status,
    read,
    list,
    create,
    update,
    destroy,
    readByDifuntoId
};
