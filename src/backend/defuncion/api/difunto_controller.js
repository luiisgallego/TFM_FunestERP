'use strict';

let merge = require('lodash.merge'),
    moment = require('moment');

let axios = require('axios');

let servicioController = require('./servicio_controller');
let difuntoModel = require('./difunto_model');

function status(req, res) {

    // Mostramos status OK
    let data = { "status" : "OK" };
    res.status(200).type('json').send(data);
}

async function read(req, res) {

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
            const message = {'error': 'Falta parametro _id'};
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
                new_difunto.updatedAt = moment().format();

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

async function destroyDifunto(req) {

    return new Promise(resolve => {
        difuntoModel.findById(req.params._id)
            .then(difunto => {
                if (!difunto) {
                    const message = {'error': 'Difunto no encontrado'};
                    resolve([200, message]);
                }

                difunto.remove()
                    .then(() => {
                        resolve([204, {}]);
                    })
                    .catch((err) => {
                        const message = {'error': err.message};
                        resolve([404, message]);
                    });
            })
            .catch(err => {
                const message = {'error': err.message};
                resolve([404, message]);
            });
    });
}

async function destroyFamilia(difunto_id) {

    return new Promise((resolve, reject) => {
        axios.delete('http://localhost:3040/familia/destroy_difunto', {
                data: {
                    difunto_id: difunto_id
                }
            })
            .then(response => {
                resolve([response.status, response.data]);
            })
            .catch(error => {
                reject([404, error.response.data]);
            });
    });
}

async function eliminarDifuntoCliente(difunto_id) {

    return new Promise((resolve, reject) => {
        axios.delete('http://localhost:3030/cliente/destroy_difunto', {
                data: {
                    difunto_id: difunto_id
                }
            })
            .then(response => {
                resolve([response.status, response.data]);
            })
            .catch(error => {
                reject([404, error.response.data]);
            });
    });
}

async function destroy(req, res) {

    const [status_difunto, difunto] = await destroyDifunto(req);
    if (status_difunto === 204) {

        const difunto_id = req.params._id;
        const [status_familiares, familia] = await destroyFamilia(difunto_id);
        const [status_cliente, cliente] = await eliminarDifuntoCliente(difunto_id);
        const [status_servicio, servicio] = await servicioController.destroyByDifunto(req);

        if (status_familiares === 204 && status_cliente === 204 && status_servicio === 204) {
            return res.status(204).type('json').send();
        }
        if (status_familiares === 200 || status_cliente === 200 || status_servicio === 200) {
            return res.status(200).type('json').send({
                'familia': familia,
                'cliente': cliente,
                'servicio': servicio
            });
        }
        return res.status(404).type('json').send({
            'familia': familia,
            'cliente': cliente,
            'servicio': servicio
        });
    }
    return res.status(status_difunto).type('json').send(difunto);
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
