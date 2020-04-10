'use strict';

let objectId = require('mongoose').mongo.ObjectId;
let mongoose = require('mongoose');
let merge = require('lodash.merge');

let userModel = require('./model');
let passport = require('./passport');

function status(req, res) {

    // Mostramos status OK
    let data = { "status" : "OK" };
    res.status(200).type('json').send(data);
}

function read(req, res) {

    if (!req.params._id && !req.params.username) {
        return res.status(404).type('json').send({'error': 'Faltan parametros'});
    }

    if (req.params._id) {
        userModel.findById(req.params._id,  (err, user) => {
            if (err) return res.status(404).type('json').send({'error': err.message});
            if (!user) return res.status(200).type('json').send({'error': 'Usuario no encontrado'});
            else res.status(200).type('json').send(user)
        });
    }

    if(req.params.username) {
        userModel.findOne({'username': req.params.username}, (err, user) => {
            if (err) return res.status(404).type('json').send({'error': err.message});
            if (!user) return res.status(200).type('json').send({'error': 'Usuario no encontrado'});
            else res.status(200).type('json').send(user)
        });
    }
}

function list(req, res) {

    userModel.find((err, users) => {
        if (err) return res.status(404).type('json').send({'error': err.message});
        if (!users) return res.status(200).type('json').send({'error': 'Ningun usuario encontrado'});
        else res.status(200).type('json').send(users)
    });
}

function create(req, res) {

    userModel.create(req.body, (err, user) => {
        if (err) return res.status(404).type('json').send({'error': err.message});
        else res.status(200).type('json').send(user)
    });
}

function updateAll(req, res) {

}

function update(req, res) {

    // console.log('UPDATE');
    //
    // let orig = {
    //     'name': 'luis',
    //     'password': 'pass',
    //     'email': 'correo@gmail.com'
    // };
    //
    // let fin = {'user': 'fran'};
    //
    // let result = merge(orig, fin);
    //
    // console.log(result);

}

function destroy(req, res) {

}


function login(req, res, next) {

    if(!req.body.password) {
        return res.status(404).type('json').send({'error': 'No password'});
    }

    if (!req.body.username && !req.body.email) {
        return res.status(404).type('json').send({'error': 'No user o email'});
    }

    if (req.body.username) {
        return passport.authenticate('user-local',   {session: false}, (err, passportUser, info) => {
            if (err) return next(err);
            if (passportUser) return res.status(200).type('json').send(passportUser);
            return res.status(401).send(info);
        })(req, res, next);
    }

    if (req.body.email) {
        return passport.authenticate('email-local',   {session: false}, (err, passportUser, info) => {
            if (err) return next(err);
            if (passportUser) return res.status(200).type('json').send(passportUser);
            return res.status(401).send(info);
        })(req, res, next);
    }
}

module.exports = {
    status,
    read,
    list,
    create,
    updateAll,
    update,
    destroy,
    login
};