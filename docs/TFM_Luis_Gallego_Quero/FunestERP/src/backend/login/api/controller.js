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
        const message = {'error': 'Faltan parametros'};
        return enviarResponse(req, res, req.params, message, 404).then();
    }

    if (req.params._id) {
        userModel.findById(req.params._id)
            .then(user => {
                if (!user) {
                    const message = {'error': 'Usuario no encontrado'};
                    return enviarResponse(req, res, req.params, message, 200).then();
                }
                enviarResponse(req, res, req.params, user, 200).then();
            })
            .catch(err => {
                const message = {'error': err.message};
                enviarResponse(req, res, req.params, message, 404).then();
            });
    }

    if(req.params.username) {
        userModel.findOne({'username': req.params.username})
            .then(user => {
                if (!user) {
                    const message = {'error': 'Usuario no encontrado'};
                    return enviarResponse(req, res, req.params, message, 200).then();
                }
                enviarResponse(req, res, req.params, user, 200).then();
            })
            .catch(err => {
                const message = {'error': err.message};
                enviarResponse(req, res, req.params, message, 404).then();
            });
    }
}

function list(req, res) {

    userModel.find()
        .then(users => {
            if (!users) {
                const message = {'error': 'Ningun usuario encontrado'};
                return enviarResponse(req, res, {}, message, 200).then();
            }
            enviarResponse(req, res, {}, users, 200).then();
        })
        .catch(err => {
            const message = {'error': err.message};
            enviarResponse(req, res, {}, message, 404).then();
        });
}

function create(req, res) {

    let newUser = new userModel(req.body);

    if (!newUser.password) {
        const message = {'error': 'Email is required'};
        return enviarResponse(req, res, req.body, message, 404).then();
    }

    newUser.setPassword(newUser.password);

    userModel.create(newUser)
        .then(user => {
            enviarResponse(req, res, req.body, user, 200).then();
        })
        .catch(err => {
            const message = {'error': err.message};
            enviarResponse(req, res, req.body, message, 404).then();
        });
}

function update(req, res) {

    if (!req.body._id) {
        const message = {'error': 'Faltan parametro _id'};
        return enviarResponse(req, res, req.body, message, 404).then();
    }

    userModel.findById(req.body._id)
        .then((user) => {
            if (!user) {
                const message = {'error': 'Usuario no encontrado'};
                return enviarResponse(req, res, req.body, message, 200).then();
            }

            let new_user = new userModel(merge(user, req.body));
            new_user.updatedAt = moment().format();
            new_user.setPassword(new_user.password);

            new_user.save()
                .then(() => {
                    enviarResponse(req, res, req.body, new_user, 200).then();
                })
                .catch(err => {
                    const message = {'error': err.message};
                    enviarResponse(req, res, req.body, message, 404).then();
                });
        })
        .catch(err => {
            const message = {'error': err.message};
            enviarResponse(req, res, req.body, message, 404).then();
        });
}

function destroy(req, res) {

    userModel.findById(req.params._id)
        .then(user => {
            if (!user) {
                const message = {'error': 'Usuario no encontrado'};
                return enviarResponse(req, res, req.params, message, 200).then();
            }

            user.remove()
                .then(() => {
                    enviarResponse(req, res, req.params, {}, 204).then();
                })
                .catch((err) => {
                    const message = {'error': err.message};
                    enviarResponse(req, res, req.params, message, 404).then();
                });
        })
        .catch(err => {
            const message = {'error': err.message};
            enviarResponse(req, res, req.params, message, 404).then();
        });
}

function login(req, res, next) {

    if(!req.body.password) {
        const message = {'error': 'No password'};
        return enviarResponse(req, res, req.body, message, 404).then();
    }

    if (!req.body.username && !req.body.email) {
        const message = {'error': 'No user o email'};
        return enviarResponse(req, res, req.body, message, 404).then();
    }

    if (req.body.username) {
        return passport.authenticate('user-local',   {session: false}, (err, passportUser, info) => {
            if (err) return next(err);
            if (passportUser) return enviarResponse(req, res, req.body, passportUser, 200).then();
            return enviarResponse(req, res, req.body, info, 401).then();
        })(req, res, next);
    }

    if (req.body.email) {
        return passport.authenticate('email-local',   {session: false}, (err, passportUser, info) => {
            if (err) return next(err);
            if (passportUser) return enviarResponse(req, res, req.body, passportUser, 200).then();
            return enviarResponse(req, res, req.body, info, 401).then();
        })(req, res, next);
    }
}

async function enviarResponse(req, res, input, output, status) {

    let log = {
        service: 3,
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
