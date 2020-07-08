'use strict';

let merge = require('lodash.merge'),
    moment = require('moment'),
    axios = require('axios');

let servicioModel = require('./servicio_model');

function status(req, res) {

    // Mostramos status OK
    let data = { "status" : "OK" };
    enviarResponse(req, res, {}, data, 200).then();
}

async function read(req, res) {

    return new Promise(resolve => {
        servicioModel.findById(req.params._id)
            .then(servicio => {
                if (!servicio) {
                    const message = {'error': 'Servicio no encontrado'};
                    if (res) return enviarResponse(req, res, req.params, message, 200).then();
                    resolve([200, message]);
                } else {
                    if (res) return enviarResponse(req, res, req.params, servicio, 200).then();
                    resolve([200, servicio]);
                }
            })
            .catch(err => {
                const message = {'error': err.message};
                if (res) return enviarResponse(req, res, req.params, message, 404).then();
                resolve([404, message]);
            });
    });
}

async function readByDifuntoId(req, res) {

    return new Promise(resolve => {
        servicioModel.findOne({difunto: req.params.difunto})
            .then(servicio => {
                if (!servicio) {
                    const message = {'error': 'Servicio no encontrado'};
                    if (res) return enviarResponse(req, res, req.params, message, 200).then();
                    resolve([200, message]);
                } else {
                    if (res) return enviarResponse(req, res, req.params, servicio, 200).then();
                    resolve([200, servicio]);
                }
            })
            .catch(err => {
                const message = {'error': err.message};
                if (res) return enviarResponse(req, res, req.params, message, 404).then();
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
                    if (res) return enviarResponse(req, res, {}, message, 200).then();
                    resolve([200, message]);
                } else {
                    if (res) return enviarResponse(req, res, {}, servicios, 200).then();
                    resolve([200, servicios]);
                }
            })
            .catch(err => {
                const message = {'error': err.message};
                if (res) return enviarResponse(req, res, {}, message, 404).then();
                resolve([404, message]);
            });
    });
}

async function create(req, res) {

    return new Promise((resolve) => {
        if (Object.keys(req.body).length === 0) {
            const message = {'error': 'No hay parametros'};
            if (res) return enviarResponse(req, res, req.body, message, 404).then();
            resolve([404, message]);
        }

        servicioModel.create(req.body)
            .then(servicio => {
                if (res) return enviarResponse(req, res, req.body, servicio, 200).then();
                else resolve([200, servicio]);
            })
            .catch(err => {
                const message = {'error': err.message};
                if (res) return enviarResponse(req, res, req.body, message, 404).then();
                else resolve([404, message]);
            });
    });
}

function update(req, res) {

    return new Promise(resolve => {

        if (!req.body._id) {
            const message = {'error': 'Falta parametro _id'};
            if (res) return enviarResponse(req, res, req.body, message, 404).then();
            resolve([404, message]);
        }

        servicioModel.findById(req.body._id)
            .then(servicio => {
                if (!servicio) {
                    const message = {'error': 'Difunto no encontrado'};
                    if (res) return enviarResponse(req, res, req.body, message, 200).then();
                    resolve([200, message]);
                }

                let new_servicio = new servicioModel(merge(servicio, req.body));
                new_servicio.updatedAt = moment().format();

                new_servicio.save()
                    .then(() => {
                        if (res) return enviarResponse(req, res, req.body, new_servicio, 200).then();
                        resolve([200, new_servicio]);
                    })
                    .catch(err => {
                        const message = {'error': err.message};
                        if (res) return enviarResponse(req, res, req.body, message, 404).then();
                        resolve([404, message]);
                    });
            })
            .catch(err => {
                const message = {'error': err.message};
                if (res) return enviarResponse(req, res, req.body, message, 404).then();
                resolve([404, message]);
            });

        });
}

async function destroy(req, res) {

    return new Promise(resolve => {
        servicioModel.findById(req.params._id)
            .then(servicio => {
                if (!servicio) {
                    const message = {'error': 'Servicio no encontrado'};
                    if (res) return enviarResponse(req, res, req.params, message, 200).then();
                    resolve([200, message]);
                }

                servicio.remove()
                    .then(() => {
                        if (res) return enviarResponse(req, res, req.params, {}, 204).then();
                        resolve([204, {}]);
                    })
                    .catch((err) => {
                        const message = {'error': err.message};
                        if (res) return enviarResponse(req, res, req.params, message, 404).then();
                        resolve([404, message]);
                    });
            })
            .catch(err => {
                const message = {'error': err.message};
                if (res) return enviarResponse(req, res, req.params, message, 404).then();
                resolve([404, message]);
            });
    });
}

async function destroyByDifunto(req, res) {

    return new Promise(resolve => {
        servicioModel.findOne({difunto: req.params._id})
            .then(servicio => {
                if (!servicio) {
                    const message = {'error': 'Servicio no encontrado'};
                    if (res) return enviarResponse(req, res, req.params, message, 200).then();
                    resolve([200, message]);
                }

                servicio.remove()
                    .then(() => {
                        if (res) return enviarResponse(req, res, req.params, {}, 204).then();
                        resolve([204, {}]);
                    })
                    .catch((err) => {
                        const message = {'error': err.message};
                        if (res) return enviarResponse(req, res, req.params, message, 404).then();
                        resolve([404, message]);
                    });
            })
            .catch(err => {
                const message = {'error': err.message};
                if (res) return enviarResponse(req, res, req.params, message, 404).then();
                resolve([404, message]);
            });
    });
}

async function enviarResponse(req, res, input, output, status) {

    let log = {
        service: 0,
        method: req.method,
        route: req.baseUrl + req.url,
        status: status,
        input: input,
        output: output
    };

    axios.post('http://localhost:3050/log', log).then().catch(err => {});
    res.status(status).type('json').send(output);
}


module.exports = {
    status,
    read,
    list,
    create,
    update,
    destroy,
    readByDifuntoId,
    destroyByDifunto
};
