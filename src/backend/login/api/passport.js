'use strict';

let passport = require('passport');
let Strategy = require('passport-local').Strategy;
let userModel = require('./model');

passport.use(new Strategy((username, password, done) => {
    userModel.findOne({user_id: username})
        .then((user) => {
            if (!user) return done(null, false, {'error': 'Usuario no encontrado'});
            if(user.password !== password) {
                return done(null, false, {'error': 'Contrasena incorrecta'});
            }
            return done(null, user);
        }).catch(done);
}));

module.exports = passport;
