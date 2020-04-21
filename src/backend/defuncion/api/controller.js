'use strict';

// let merge = require('lodash.merge');

// let difuntoModel = require('./difunto_model');

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

module.exports = {
    status,
    read,
    list,
    create,
    update,
    destroy,
};
