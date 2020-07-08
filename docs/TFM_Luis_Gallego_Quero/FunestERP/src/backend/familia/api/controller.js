'use strict';

let moment = require('moment'),
    axios = require('axios');

let familiaModel = require('./familia_model');

function status(req, res) {

    // Mostramos status OK
    let data = { "status" : "OK" };
    enviarResponse(req, res, {}, data, 200).then();
}

function read(req, res) {

    return new Promise(resolve => {
        familiaModel.findById(req.params._id)
            .then(familia => {
                if (!familia) {
                    const message = {'error': 'Familia no encontrada'};
                    return enviarResponse(req, res, req.params, message, 200).then();
                }
                return enviarResponse(req, res, req.params, familia, 200).then();
            })
            .catch(err => {
                const message = {'error': err.message};
                return enviarResponse(req, res, req.params, message, 404).then();
            });
    });
}

function list(req, res) {

    return new Promise(resolve => {
        familiaModel.find()
            .then(familias => {
                if (!familias) {
                    const message = {'error': 'Ninguna familia encontrado'};
                    return enviarResponse(req, res, {}, message, 200).then();
                }
                return enviarResponse(req, res, {}, familias, 200).then();
            })
            .catch(err => {
                const message = {'error': err.message};
                return enviarResponse(req, res, {}, message, 404).then();
            });
    });
}

async function create_familia(req) {

    return new Promise(resolve => {
        familiaModel.create(req.body)
            .then(familia => {
                resolve([200, familia]);
            })
            .catch(err => {
                const message = {'error': err.message};
                resolve([404, message]);
            });
    });
}

async function create(req, res) {

    const [status_familia, familia] = await create_familia(req);
    // Si se ha creado bien la familia enviamos la info al difunto
    if (status_familia === 200) enlazarFamiliaDifunto(familia.difunto, familia._id);
    return enviarResponse(req, res, req.body, familia, status_familia).then();
}

function update(req, res) {

    return new Promise(resolve => {

        if (!req.body._id) {
            const message = {'error': 'Falta parametro _id'};
            return enviarResponse(req, res, req.body, message, 404).then();
        }
        if (!req.body.arbol || req.body.arbol.length === 0) {
            const message = {'error': 'El arbol no puede ser vacio'};
            return enviarResponse(req, res, req.body, message, 404).then();
        }

        familiaModel.findById(req.body._id)
            .then(familia => {
                if (!familia) {
                    const message = {'error': 'Familia no encontrada'};
                    return enviarResponse(req, res, req.body, message, 200).then();
                }

                if (req.body.updatedBy) {
                    familia.updatedBy = req.body.updatedBy;
                }
                if (req.body.difunto) {
                    familia.difunto = req.body.difunto;
                }
                familia.arbol = req.body.arbol;
                familia.updatedAt = moment().format();

                familia.save()
                    .then(() => {
                        return enviarResponse(req, res, req.body, familia, 200).then();
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
        familiaModel.findById(req.params._id)
            .then(familia => {
                if (!familia) {
                    const message = {'error': 'Familia no encontrada'};
                    return enviarResponse(req, res, req.params, message, 200).then();
                }

                familia.remove()
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

async function enviarResponse(req, res, input, output, status) {

    let log = {
        service: 2,
        method: req.method,
        route: req.baseUrl + req.url,
        status: status,
        input: input,
        output: output
    };

    axios.post('http://localhost:3050/log', log).then().catch(err => {});
    res.status(status).type('json').send(output);
}

async function enlazarFamiliaDifunto(difunto_id, familia_id) {

    return new Promise((resolve, reject) => {
        if (!difunto_id || !familia_id) {
            resolve([404,  {}]);
        }
        else {
            let data = {
                _id: difunto_id,
                familia_id: familia_id
            };

            axios.post('http://localhost:3020/defuncion/difunto/familia', data)
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
    destroy
};
