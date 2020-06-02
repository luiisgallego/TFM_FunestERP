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

async function create_cliente(req) {

    return new Promise(resolve => {
        clienteModel.create(req.body)
            .then(cliente => {
                resolve([200, cliente]);
            })
            .catch(err => {
                const message = {'error': err.message};
                resolve([404, message]);
            });
    });
}

async function create(req, res) {

    const [status_cliente, cliente] = await create_cliente(req);
    // Si se ha creado bien el cliente enviamos la info al difunto
    if (status_cliente === 200) enlazarClienteDifunto (cliente.difunto[0], cliente._id);
    return enviarResponse(req, res, req.body, cliente, status_cliente).then();
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

                // Enviamos el id del cliente al difunto
                enlazarClienteDifunto(req.body.difunto_id, cliente._id);

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

                // Enviamos el id del cliente al difunto
                eliminarEnlaceClienteDifunto(difunto_id, _id);

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

async function enlazarClienteDifunto(difunto_id, cliente_id) {

    return new Promise((resolve, reject) => {
        if (!difunto_id || !cliente_id) {
            resolve([200,  {}]);
        }
        else {
            let data = {
                _id: difunto_id,
                cliente_id: cliente_id
            };

            axios.post('http://localhost:3020/defuncion/difunto/cliente', data)
                .then(response => {
                    resolve([200, response]);
                })
                .catch(err => {
                    reject([404, err]);
                });
        }
    });
}

async function eliminarEnlaceClienteDifunto(difunto_id, cliente_id) {

    return new Promise((resolve, reject) => {
        if (!difunto_id || !cliente_id) {
            resolve([200,  {}]);
        }
        else {
            let data = {
                _id: difunto_id,
                cliente_id: cliente_id
            };

            axios.post('http://localhost:3020/defuncion/difunto/cliente/eliminar', data)
                .then(response => {
                    resolve([200, response]);
                })
                .catch(err => {

                    reject([404, err]);
                });
        }
    });
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
