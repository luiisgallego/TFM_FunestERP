'use strict';

let merge = require('lodash.merge'),
    moment = require('moment'),
    passport = require('./passport'),
    axios = require('axios');

let userModel = require('./user_model');

async function status(req, res) {

    // Mostramos status OK
    let data = { "status" : "OK" };
    enviarResponse(req, res, {}, data, 200).then();
}

function read(req, res) {

    if (!req.params._id && !req.params.username) {
        return enviarResponse(req, res, req.params, {'error': 'Faltan parametros'}, 404).then();
    }

    if (req.params._id) {
        userModel.findById(req.params._id)
            .then(user => {
                if (!user) return enviarResponse(req, res, req.params, {'error': 'Usuario no encontrado'}, 200).then();
                enviarResponse(req, res, req.params, user, 200).then();
            })
            .catch(err => {
                enviarResponse(req, res, req.params, {'error': err.message}, 404).then();
            });
    }

    if(req.params.username) {
        userModel.findOne({'username': req.params.username})
            .then(user => {
                if (!user) return enviarResponse(req, res, req.params, {'error': 'Usuario no encontrado'}, 200).then();
                enviarResponse(req, res, req.params, user, 200).then();
            })
            .catch(err => {
                enviarResponse(req, res, req.params, {'error': err.message}, 404).then();
            });
    }
}

function list(req, res) {

    userModel.find()
        .then(users => {
            if (!users) return enviarResponse(req, res, req.params, {'error': 'Ningun usuario encontrado'}, 200).then();
            enviarResponse(req, res, req.params, users, 200).then();
        })
        .catch(err => {
            enviarResponse(req, res, req.params, {'error': err.message}, 404).then();
        });
}

function create(req, res) {

    let newUser = new userModel(req.body);

    if (!newUser.password) {
        return enviarResponse(req, res, req.params, {'error': 'Email is required'}, 404).then();
    }

    newUser.setPassword(newUser.password);

    userModel.create(newUser)
        .then(user => {
            enviarResponse(req, res, req.params, user, 200).then();
        })
        .catch(err => {
            enviarResponse(req, res, req.params, {'error': err.message}, 404).then();
        });
}

function update(req, res) {

    if (!req.body._id) {
        return enviarResponse(req, res, req.params, {'error': 'Faltan parametro _id'}, 404).then();
    }

    userModel.findById(req.body._id)
        .then((user) => {
            if (!user) return enviarResponse(req, res, req.params, {'error': 'Usuario no encontrado'}, 200).then();

            let new_user = new userModel(merge(user, req.body));
            new_user.updatedAt = moment().format();
            new_user.setPassword(new_user.password);

            new_user.save()
                .then(() => {
                    enviarResponse(req, res, req.params, new_user, 200).then();
                })
                .catch(err => {
                    enviarResponse(req, res, req.params, {'error': err.message}, 404).then();
                });
        })
        .catch(err => {
            enviarResponse(req, res, req.params, {'error': err.message}, 404).then();
        });
}

function destroy(req, res) {

    userModel.findById(req.params._id)
        .then(user => {
            if (!user) return enviarResponse(req, res, req.params, {'error': 'Usuario no encontrado'}, 200).then();

            user.remove()
                .then(() => {
                    enviarResponse(req, res, req.params, {}, 204).then();
                })
                .catch((err) => {
                    enviarResponse(req, res, req.params, {'error': err.message}, 404).then();
                });
        })
        .catch(err => {
            enviarResponse(req, res, req.params, {'error': err.message}, 404).then();
        });
}

function login(req, res, next) {

    if(!req.body.password) {
        return enviarResponse(req, res, req.params, {'error': 'No password'}, 404).then();
    }

    if (!req.body.username && !req.body.email) {
        return enviarResponse(req, res, req.params, {'error': 'No user o email'}, 404).then();
    }

    if (req.body.username) {
        return passport.authenticate('user-local',   {session: false}, (err, passportUser, info) => {
            if (err) return next(err);
            if (passportUser) return enviarResponse(req, res, req.params, passportUser, 200).then();
            return enviarResponse(req, res, req.params, info, 401).then();
        })(req, res, next);
    }

    if (req.body.email) {
        return passport.authenticate('email-local',   {session: false}, (err, passportUser, info) => {
            if (err) return next(err);
            if (passportUser) return enviarResponse(req, res, req.params, passportUser, 200).then();
            return enviarResponse(req, res, req.params, info, 401).then();
        })(req, res, next);
    }
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
    login
};
