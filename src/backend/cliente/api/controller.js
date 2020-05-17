'use strict';

let merge = require('lodash.merge'),
    moment = require('moment'),
    axios = require('axios');

let clienteModel = require('./cliente_model');

function status(req, res) {

    // Mostramos status OK
    let data = { "status" : "OK" };
    enviarResponse(req, res, {}, data, 200).then();
}

function read(req, res) {

    return new Promise(resolve => {
        clienteModel.findById(req.params._id)
            .then(cliente => {
                if (!cliente) {
                    const message = {'error': 'Cliente no encontrado'};
                    return enviarResponse(req, res, req.params, message, 200).then();
                }
                return enviarResponse(req, res, req.params, cliente, 200).then();
            })
            .catch(err => {
                const message = {'error': err.message};
                return enviarResponse(req, res, req.params, message, 404).then();
            });
    });
}

function list(req, res) {

    return new Promise(resolve => {
        clienteModel.find()
            .then(clientes => {
                if (!clientes) {
                    const message = {'error': 'Ningun cliente encontrado'};
                    return enviarResponse(req, res, {}, message, 200).then();
                }
                return enviarResponse(req, res, {}, clientes, 200).then();
            })
            .catch(err => {
                const message = {'error': err.message};
                return enviarResponse(req, res, {}, message, 404).then();
            });
    });
}

function create(req, res) {

    return new Promise(resolve => {
        clienteModel.create(req.body)
            .then(cliente => {
                return enviarResponse(req, res, req.body, cliente, 200).then();
            })
            .catch(err => {
                const message = {'error': err.message};
                return enviarResponse(req, res, req.body, message, 404).then();
            });
    });
}

function update(req, res) {

    return new Promise(resolve => {

        if (!req.body._id) {
            const message = {'error': 'Falta parametro _id'};
            return enviarResponse(req, res, req.body, message, 404).then();
        }

        clienteModel.findById(req.body._id)
            .then(cliente => {
                if (!cliente) {
                    const message = {'error': 'Cliente no encontrado'};
                    return enviarResponse(req, res, req.body, message, 200).then();
                }

                let new_cliente = new clienteModel(merge(cliente, req.body));
                new_cliente.updatedAt = moment().format();

                new_cliente.save()
                    .then(() => {
                        return enviarResponse(req, res, req.body, new_cliente, 200).then();
                    })
                    .catch(err => {
                        const message = {'error': err.message};
                        return enviarResponse(req, res, req.body, message, 404).then();
                    });
            })
            .catch(err => {
                const message = {'error': err.message};
                return enviarResponse(req, res, req.body, message, 404).then();
            });
    });
}

function destroy(req, res) {

    return new Promise(resolve => {
        clienteModel.findById(req.params._id)
            .then(cliente => {
                if (!cliente) {
                    const message = {'error': 'Cliente no encontrado'};
                    return enviarResponse(req, res, req.params, message, 200).then();
                }

                cliente.remove()
                    .then(() => {
                        return enviarResponse(req, res, req.params, {}, 204).then();
                    })
                    .catch((err) => {
                        const message = {'error': err.message};
                        return enviarResponse(req, res, req.params, message, 404).then();
                    });
            })
            .catch(err => {
                const message = {'error': err.message};
                return enviarResponse(req, res, req.params, message, 404).then();
            });
    });
}

function asignarDifunto(req, res) {

    return new Promise(resolve => {

        if (!req.body.difunto_id) {
            const message = {'error': 'Falta parametro difunto_id'};
            return enviarResponse(req, res, req.body, message, 404).then();
        }

        clienteModel.findById(req.body._id)
            .then(cliente => {
                if (!cliente) {
                    const message = {'error': 'Cliente no encontrado'};
                    return enviarResponse(req, res, req.body, message, 200).then();
                }

                if (cliente.difunto.includes(req.body.difunto_id)) {
                    const message = {'error': 'Difunto ya asociado'};
                    return enviarResponse(req, res, req.body, message, 404).then();
                }

                // Añadimos la info
                cliente.difunto.push(req.body.difunto_id);
                cliente.updatedAt = moment().format();

                cliente.save()
                    .then(() => {
                        return enviarResponse(req, res, req.body, cliente, 200).then();
                    })
                    .catch(err => {
                        const message = {'error': err.message};
                        return enviarResponse(req, res, req.body, message, 404).then();
                    });
            })
            .catch(err => {
                const message = {'error': err.message};
                return enviarResponse(req, res, req.body, message, 404).then();
            });
        });
}

function eliminarDifunto(req, res) {

    return new Promise(resolve => {

        let _id = req.params._id;
        let difunto_id = req.params.difunto_id;

        if (!_id || !difunto_id) {
            const message = {'error': 'Falta parametros'};
            return enviarResponse(req, res, req.params, message, 404).then();
        }

        clienteModel.findById(req.params._id)
            .then(cliente => {
                if (!cliente) {
                    const message = {'error': 'Cliente no encontrado'};
                    return enviarResponse(req, res, req.params, message, 200).then();
                }

                if (!cliente.difunto.includes(difunto_id)) {
                    const message = {'error': 'Difunto no asociado'};
                    return enviarResponse(req, res, req.params, message, 404).then();
                }

                // Eliminamos tan solo la asociacion
                let difuntosFinal = [];
                for (let i=0; i<cliente.difunto.length; i++) {
                    if (cliente.difunto[i].toString() !== difunto_id.toString()) {
                        difuntosFinal.push(cliente.difunto[i]);
                    }
                }
                cliente.difunto = difuntosFinal;
                cliente.updatedAt = moment().format();

                cliente.save()
                    .then(() => {
                        return enviarResponse(req, res, req.params, cliente, 200).then();
                    })
                    .catch(err => {
                        const message = {'error': err.message};
                        return enviarResponse(req, res, req.params, message, 404).then();
                    });
            })
            .catch(err => {
                const message = {'error': err.message};
                return enviarResponse(req, res, req.params, message, 404).then();
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
    asignarDifunto,
    eliminarDifunto
};
