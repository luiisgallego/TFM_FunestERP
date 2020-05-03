'use strict';

let merge = require('lodash.merge'),
    moment = require('moment');

let userModel = require('./user_model');
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
        userModel.findById(req.params._id)
            .then(user => {
                if (!user) return res.status(200).type('json').send({'error': 'Usuario no encontrado'});
                res.status(200).type('json').send(user);
            })
            .catch(err => {
                return res.status(404).type('json').send({'error': err.message});
            });
    }

    if(req.params.username) {
        userModel.findOne({'username': req.params.username})
            .then(user => {
                if (!user) return res.status(200).type('json').send({'error': 'Usuario no encontrado'});
                res.status(200).type('json').send(user);
            })
            .catch(err => {
                return res.status(404).type('json').send({'error': err.message});
            });
    }
}

function list(req, res) {

    userModel.find()
        .then(users => {
            if (!users) return res.status(200).type('json').send({'error': 'Ningun usuario encontrado'});
            res.status(200).type('json').send(users);
        })
        .catch(err => {
            return res.status(404).type('json').send({'error': err.message});
        });
}

function create(req, res) {

    userModel.create(req.body)
        .then(user => {
            res.status(200).type('json').send(user)
        })
        .catch(err => {
            res.status(404).type('json').send({'error': err.message});
        });
}

function update(req, res) {

    if (!req.body._id) {
        return res.status(404).type('json').send({'error': 'Faltan parametro _id'});
    }

    userModel.findById(req.body._id)
        .then((user) => {
            if (!user) return res.status(200).type('json').send({'error': 'Usuario no encontrado'});

            let new_user = new userModel(merge(user, req.body));
            new_user.updatedAt = moment().format();

            new_user.save()
                .then(() => {
                    res.status(200).type('json').send(new_user);
                })
                .catch(err => {
                    res.status(404).type('json').send({'error': err.message});
                });
        })
        .catch(err => {
            res.status(404).type('json').send({'error': err.message});
        });
}

function destroy(req, res) {

    userModel.findById(req.params._id)
        .then(user => {
            if (!user) return res.status(200).type('json').send({'error': 'Usuario no encontrado'});

            user.remove()
                .then(() => {
                    return res.status(204).send();
                })
                .catch((err) => {
                    return res.status(404).type('json').send({'error': err.message});
                });
        })
        .catch(err => {
            return res.status(404).type('json').send({'error': err.message});
        });
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
    update,
    destroy,
    login
};
