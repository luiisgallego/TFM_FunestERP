'use strict';

let merge = require('lodash.merge'),
    moment = require('moment');

let clienteModel = require('./cliente_model');

function status(req, res) {

    // Mostramos status OK
    let data = { "status" : "OK" };
    res.status(200).type('json').send(data);
}

function read(req, res) {

    return new Promise(resolve => {
        clienteModel.findById(req.params._id)
            .then(cliente => {
                if (!cliente) {
                    const message = {'error': 'Cliente no encontrado'};
                    return res.status(200).type('json').send(message);
                }
                return res.status(200).type('json').send(cliente);
            })
            .catch(err => {
                const message = {'error': err.message};
                return res.status(404).type('json').send(message);
            });
    });
}

function list(req, res) {

    return new Promise(resolve => {
        clienteModel.find()
            .then(clientes => {
                if (!clientes) {
                    const message = {'error': 'Ningun cliente encontrado'};
                    return res.status(200).type('json').send(message);
                }
                return res.status(200).type('json').send(clientes);
            })
            .catch(err => {
                const message = {'error': err.message};
                return res.status(404).type('json').send(message);
            });
    });
}

function create(req, res) {

    return new Promise(resolve => {
        clienteModel.create(req.body)
            .then(cliente => {
                return res.status(200).type('json').send(cliente);
            })
            .catch(err => {
                const message = {'error': err.message};
                return res.status(404).type('json').send(message);
            });
    });
}

function update(req, res) {

    return new Promise(resolve => {

        if (!req.body._id) {
            const message = {'error': 'Falta parametro _id'};
            return res.status(404).type('json').send(message);
        }

        clienteModel.findById(req.body._id)
            .then(cliente => {
                if (!cliente) {
                    const message = {'error': 'Cliente no encontrado'};
                    return res.status(200).type('json').send(message);
                }

                let new_cliente = new clienteModel(merge(cliente, req.body));
                new_cliente.updatedAt = moment().format();

                new_cliente.save()
                    .then(() => {
                        return res.status(200).type('json').send(new_cliente);
                    })
                    .catch(err => {
                        const message = {'error': err.message};
                        return res.status(404).type('json').send(message);
                    });
            })
            .catch(err => {
                const message = {'error': err.message};
                return res.status(404).type('json').send(message);
            });

    });
}

function destroy(req, res) {

    return new Promise(resolve => {
        clienteModel.findById(req.params._id)
            .then(cliente => {
                if (!cliente) {
                    const message = {'error': 'Cliente no encontrado'};
                    return res.status(200).type('json').send(message);
                }

                cliente.remove()
                    .then(() => {
                        return res.status(204).type('json').send();
                    })
                    .catch((err) => {
                        const message = {'error': err.message};
                        return res.status(404).type('json').send(message);
                    });
            })
            .catch(err => {
                const message = {'error': err.message};
                return res.status(404).type('json').send(message);
            });
    });
}


function asignarDifunto(req, res) {

    return new Promise(resolve => {

        if (!req.body.difunto_id) {
            const message = {'error': 'Falta parametro difunto_id'};
            return res.status(404).type('json').send(message);
        }

        clienteModel.findById(req.body._id)
            .then(cliente => {
                if (!cliente) {
                    const message = {'error': 'Cliente no encontrado'};
                    return res.status(200).type('json').send(message);
                }

                if (cliente.difunto.includes(req.body.difunto_id)) {
                    const message = {'error': 'Difunto ya asociado'};
                    return res.status(404).type('json').send(message);
                }

                // Añadimos la info
                cliente.difunto.push(req.body.difunto_id);
                cliente.updatedAt = moment().format();

                cliente.save()
                    .then(() => {
                        return res.status(200).type('json').send(cliente);
                    })
                    .catch(err => {
                        const message = {'error': err.message};
                        return res.status(404).type('json').send(message);
                    });
            })
            .catch(err => {
                const message = {'error': err.message};
                return res.status(404).type('json').send(message);
            });
        });
}

function eliminarDifunto(req, res) {

    return new Promise(resolve => {

        let _id = req.params._id;
        let difunto_id = req.params.difunto_id;

        if (!_id || !difunto_id) {
            const message = {'error': 'Falta parametros'};
            return res.status(404).type('json').send(message);
        }

        clienteModel.findById(req.params._id)
            .then(cliente => {
                if (!cliente) {
                    const message = {'error': 'Cliente no encontrado'};
                    return res.status(200).type('json').send(message);
                }

                if (!cliente.difunto.includes(difunto_id)) {
                    const message = {'error': 'Difunto no asociado'};
                    return res.status(404).type('json').send(message);
                }

                // Eliminamos
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
                        return res.status(200).type('json').send(cliente);
                    })
                    .catch(err => {
                        const message = {'error': err.message};
                        return res.status(404).type('json').send(message);
                    });
            })
            .catch(err => {
                const message = {'error': err.message};
                return res.status(404).type('json').send(message);
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
    asignarDifunto,
    eliminarDifunto
};
