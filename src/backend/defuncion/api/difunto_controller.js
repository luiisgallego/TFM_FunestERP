'use strict';

let merge = require('lodash.merge'),
    moment = require('moment'),
    axios = require('axios');

let servicioController = require('./servicio_controller');
let difuntoModel = require('./difunto_model');

function status(req, res) {

    // Mostramos status OK
    let data = { "status" : "OK" };
    enviarResponse(req, res, {}, data, 200).then();
}

async function read(req, res) {

    return new Promise(resolve => {
        difuntoModel.findById(req.params._id)
            .then(difunto => {
                if (!difunto) {
                    const message = {'error': 'Difunto no encontrado'};
                    if (res) return enviarResponse(req, res, req.params, message, 200).then();
                    resolve([200, message]);
                } else {
                    if (res) return enviarResponse(req, res, req.params, difunto, 200).then();
                    resolve([200, difunto]);
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
        difuntoModel.find()
            .then(difuntos => {
                if (!difuntos) {
                    const message = {'error': 'Ningun difunto encontrado'};
                    if (res) return enviarResponse(req, res, {}, message, 200).then();
                    resolve([200, message]);
                } else {
                    if (res) return enviarResponse(req, res, {}, difuntos, 200).then();
                    resolve([200, difuntos]);
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

    return new Promise(resolve => {
        difuntoModel.create(req.body)
            .then(difunto => {
                if (res) return enviarResponse(req, res, req.body, difunto, 200).then();
                resolve([200, difunto]);
            })
            .catch(err => {
                const message = {'error': err.message};
                if (res) return enviarResponse(req, res, req.body, message, 404).then();
                resolve([404, message]);
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

        difuntoModel.findById(req.body._id)
            .then(difunto => {
                if (!difunto) {
                    const message = {'error': 'Difunto no encontrado'};
                    if (res) return enviarResponse(req, res, req.body, message, 200).then();
                    resolve([200, message]);
                }

                let new_difunto = new difuntoModel(merge(difunto, req.body));
                new_difunto.updatedAt = moment().format();

                new_difunto.save()
                    .then(() => {
                        if (res) return enviarResponse(req, res, req.body, new_difunto, 200).then();
                        resolve([200, new_difunto]);
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
                        resolve([200, difunto]);
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

async function destroyFamilia(difunto_id, familia_id) {

    return new Promise((resolve, reject) => {
        axios.delete('http://localhost:3040/familia', {
                params: {
                    _id: familia_id.toString()
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

async function eliminarDifuntoCliente(difunto_id, cliente_id) {

    return new Promise((resolve, reject) => {
        axios.delete('http://localhost:3030/cliente/destroy_difunto', {
                params: {
                    _id: cliente_id.toString(),
                    difunto_id: difunto_id.toString()
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
    if (status_difunto === 200 && !difunto.hasOwnProperty('error')) {
        const difunto_id = req.params._id;
        const [status_familiares, familia] = await destroyFamilia(difunto_id, difunto.familia);
        const [status_cliente, cliente] = await eliminarDifuntoCliente(difunto_id, difunto.cliente);
        const [status_servicio, servicio] = await servicioController.destroyByDifunto(req);

        if (status_familiares === 204 && status_cliente === 204 && status_servicio === 204) {
            return enviarResponse(req, res, req.params, {}, 204).then();
        }
        if (status_familiares === 200 || status_cliente === 200 || status_servicio === 200) {
            let result = {
                'familia': familia,
                'cliente': cliente,
                'servicio': servicio
            };
            return enviarResponse(req, res, req.params, result, 200).then();
        }
        let result = {
            'familia': familia,
            'cliente': cliente,
            'servicio': servicio
        };
        return enviarResponse(req, res, req.params, result, 404).then();
    }
    return enviarResponse(req, res, req.params, difunto, status_difunto).then();
}

function getNoClientes(req, res) {

    return new Promise(resolve => {
        difuntoModel.find({cliente: null})
            .then(difuntos => {
                if (!difuntos) {
                    const message = {'error': 'Ningun difunto encontrado'};
                    if (res) return enviarResponse(req, res, {}, message, 200).then();
                    resolve([200, message]);
                } else {
                    if (res) return enviarResponse(req, res, {}, difuntos, 200).then();
                    resolve([200, difuntos]);
                }
            })
            .catch(err => {
                const message = {'error': err.message};
                if (res) return enviarResponse(req, res, {}, message, 404).then();
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
                    if (res) return enviarResponse(req, res, {}, message, 200).then();
                    resolve([200, message]);
                } else {
                    if (res) return enviarResponse(req, res, {}, difuntos, 200).then();
                    resolve([200, difuntos]);
                }
            })
            .catch(err => {
                const message = {'error': err.message};
                if (res) return enviarResponse(req, res, {}, message, 404).then();
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
                    if (res) return enviarResponse(req, res, {}, message, 200).then();
                    resolve([200, message]);
                } else {
                    if (res) return enviarResponse(req, res, {}, difuntos, 200).then();
                    resolve([200, difuntos]);
                }
            })
            .catch(err => {
                const message = {'error': err.message};
                if (res) return enviarResponse(req, res, {}, message, 404).then();
                resolve([404, message]);
            });
    });
}

function asignarCliente(req, res) {

    return new Promise(resolve => {
        const params = req.body;

        if (!params._id || !params.cliente_id) {
            const message = {'error': 'Faltan parametros'};
            if (res) return enviarResponse(req, res, req.body, message, 404).then();
            else resolve([404, message]);
        }

        difuntoModel.updateOne({_id: params._id}, {cliente: params.cliente_id})
            .then(() => {
                if (res) return enviarResponse(req, res, req.body, {}, 200).then();
                resolve([200, {}])
            })
            .catch(err => {
                let message = {'error': err.message};
                if (res) return enviarResponse(req, res, req.body, message, 404).then();
                resolve([404, message]);
            });
    });
}

function asignarFamilia(req, res) {

    return new Promise(resolve => {
        const params = req.body;

        if (!params._id || !params.familia_id) {
            const message = {'error': 'Faltan parametros'};
            if (res) return enviarResponse(req, res, req.body, message, 404).then();
            else resolve([404, message]);
        }

        difuntoModel.updateOne({_id: params._id}, {familia: params.familia_id})
            .then(() => {
                if (res) return enviarResponse(req, res, req.body, {}, 200).then();
                resolve([200, {}])
            })
            .catch(err => {
                let message = {'error': err.message};
                if (res) return enviarResponse(req, res, req.body, message, 404).then();
                resolve([404, message]);
            });
    });
}

function asignarFactura(req, res) {

    return new Promise(resolve => {
        const params = req.body;

        if (!params._id || !params.factura_id) {
            const message = {'error': 'Faltan parametros'};
            if (res) return enviarResponse(req, res, req.body, message, 404).then();
            else resolve([404, message]);
        }

        difuntoModel.updateOne({_id: params._id}, {factura: params.factura_id})
            .then(() => {
                if (res) return enviarResponse(req, res, req.body, {}, 200).then();
                resolve([200, {}])
            })
            .catch(err => {
                let message = {'error': err.message};
                if (res) return enviarResponse(req, res, req.body, message, 404).then();
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
    getNoClientes,
    getNoFamilia,
    getNoFactura,
    asignarCliente,
    asignarFamilia,
    asignarFactura
};
