'use strict';

let merge = require('lodash.merge'),
    mongoose = require('mongoose');

let difuntoModel = require('./difunto_model');

function status(req, res) {

    // Mostramos status OK
    let data = { "status" : "OK" };
    res.status(200).type('json').send(data);
}

function read(req, res) {

    return new Promise(resolve => {
        difuntoModel.findById(req.params._id)
            .then(difunto => {
                if (!difunto) {
                    const message = {'error': 'Difunto no encontrado'};
                    if (res) return res.status(200).type('json').send(message);
                    resolve([200, message]);
                } else {
                    if (res) return res.status(200).type('json').send(difunto);
                    resolve([200, difunto]);
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
        difuntoModel.find()
            .then(difuntos => {
                if (!difuntos) {
                    const message = {'error': 'Ningun difunto encontrado'};
                    if (res) return res.status(200).type('json').send(message);
                    resolve([200, message]);
                } else {
                    if (res) return res.status(200).type('json').send(difuntos);
                    resolve([200, difuntos]);
                }
            })
            .catch(err => {
                const message = {'error': err.message};
                if (res) return res.status(404).type('json').send(message);
                resolve([404, message]);
            });
    });
}

async function create(req, res) {

    return new Promise(resolve => {
        difuntoModel.create(req.body)
            .then(difunto => {
                if (res) return res.status(200).type('json').send(difunto);
                resolve([200, difunto]);
            })
            .catch(err => {
                const message = {'error': err.message};
                if (res) return res.status(404).type('json').send(message);
                resolve([404, message]);
            });
    });
}

function update(req, res) {

    return new Promise(resolve => {

        if (!req.body._id) {
            const message = {'error': 'Faltan parametro _id'};
            if (res) return res.status(404).type('json').send(message);
            resolve([404, message]);
        }

        difuntoModel.findById(req.body._id)
            .then(difunto => {
                if (!difunto) {
                    const message = {'error': 'Difunto no encontrado'};
                    if (res) return res.status(200).type('json').send(message);
                    resolve([200, message]);
                }

                let new_difunto = new difuntoModel(merge(difunto, req.body));
                new_difunto.updatedAt = Date.now();


                new_difunto.save()
                    .then(() => {
                        if (res) return res.status(200).type('json').send(new_difunto);
                        resolve([200, new_difunto]);
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
        difuntoModel.findById(req.params._id)
            .then(difunto => {
                if (!difunto) {
                    const message = {'error': 'Difunto no encontrado'};
                    if (res) return res.status(200).type('json').send(message);
                    resolve([200, message]);
                }

                difunto.remove()
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

function getNoClientes(req, res) {

    return new Promise(resolve => {
        difuntoModel.find({cliente: null})
            .then(difuntos => {
                if (!difuntos) {
                    const message = {'error': 'Ningun difunto encontrado'};
                    if (res) return res.status(200).type('json').send(message);
                    resolve([200, message]);
                } else {
                    if (res) return res.status(200).type('json').send(difuntos);
                    resolve([200, difuntos]);
                }
            })
            .catch(err => {
                const message = {'error': err.message};
                if (res) return res.status(404).type('json').send(message);
                resolve([404, message]);
            });
    });
}

function getNoFamilia(req, res) {

    return new Promise(resolve => {
        difuntoModel.find({familia: null})
            .then(difuntos => {
                if (!difuntos) {
                    const message = {'error': 'Ningun difunto encontrado'};
                    if (res) return res.status(200).type('json').send(message);
                    resolve([200, message]);
                } else {
                    if (res) return res.status(200).type('json').send(difuntos);
                    resolve([200, difuntos]);
                }
            })
            .catch(err => {
                const message = {'error': err.message};
                if (res) return res.status(404).type('json').send(message);
                resolve([404, message]);
            });
    });

}

function getNoFactura(req, res) {

    return new Promise(resolve => {
        difuntoModel.find({factura: null})
            .then(difuntos => {
                if (!difuntos) {
                    const message = {'error': 'Ningun difunto encontrado'};
                    if (res) return res.status(200).type('json').send(message);
                    resolve([200, message]);
                } else {
                    if (res) return res.status(200).type('json').send(difuntos);
                    resolve([200, difuntos]);
                }
            })
            .catch(err => {
                const message = {'error': err.message};
                if (res) return res.status(404).type('json').send(message);
                resolve([404, message]);
            });
    });
}

function asignarCliente(req, res) {

    return new Promise(resolve => {
        const params = req.body;

        if (!params._id || !params.cliente_id) {
            const message = {'error': 'Faltan parametros'};
            if (res) return res.status(404).type('json').send(message);
            else resolve([404, message]);
        }

        difuntoModel.updateOne({_id: params._id}, {cliente: params.cliente_id})
            .then(() => {
                if (res) return res.status(200).type('json').send();
                resolve([200, {}])
            })
            .catch(err => {
                let message = {'error': err.message};
                if (res) return res.status(404).type('json').send(message);
                resolve([404, message]);
            });
    });
}

function asignarFamilia(req, res) {

    return new Promise(resolve => {
        const params = req.body;

        if (!params._id || !params.familia_id) {
            const message = {'error': 'Faltan parametros'};
            if (res) return res.status(404).type('json').send(message);
            else resolve([404, message]);
        }

        difuntoModel.updateOne({_id: params._id}, {familia: params.familia_id})
            .then(() => {
                if (res) return res.status(200).type('json').send();
                resolve([200, {}])
            })
            .catch(err => {
                let message = {'error': err.message};
                if (res) return res.status(404).type('json').send(message);
                resolve([404, message]);
            });
    });
}

function asignarFactura(req, res) {

    return new Promise(resolve => {
        const params = req.body;

        if (!params._id || !params.factura_id) {
            const message = {'error': 'Faltan parametros'};
            if (res) return res.status(404).type('json').send(message);
            else resolve([404, message]);
        }

        difuntoModel.updateOne({_id: params._id}, {factura: params.factura_id})
            .then(() => {
                if (res) return res.status(200).type('json').send();
                resolve([200, {}])
            })
            .catch(err => {
                let message = {'error': err.message};
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
    getNoClientes,
    getNoFamilia,
    getNoFactura,
    asignarCliente,
    asignarFamilia,
    asignarFactura
};
