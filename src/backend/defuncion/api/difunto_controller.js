'use strict';

function status(req, res) {

    // Mostramos status OK
    let data = { "status" : "OK" };
    res.status(200).type('json').send(data);
}

function read(req, res) {

}

function list(req, res) {

}

function create(req, res) {

}

function update(req, res) {

}

function destroy(req, res) {

}

function getNoClientes(req, res) {

}

function getNoFamilia(req, res) {

}

function getNoFactura(req, res) {

}

function asignarCliente(req, res) {

}

function asignarFamilia(req, res) {

}

function asignarFactura(req, res) {

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
