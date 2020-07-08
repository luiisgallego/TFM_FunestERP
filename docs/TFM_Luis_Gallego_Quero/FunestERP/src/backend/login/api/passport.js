'use strict';

let passport = require('passport');
let Strategy = require('passport-local').Strategy;
let userModel = require('./user_model');

passport.use('user-local', new Strategy((username, password, done) => {
    userModel.findOne({username: username})
        .then((user) => {
            if (!user) return done(null, false, {'error': 'Usuario no encontrado'});
            if(!user.validatePassword(password)) {
                return done(null, false, {'error': 'Contrasena incorrecta'});
            }
            return done(null, user);
        }).catch(done);
}));

passport.use('email-local', new Strategy({
    usernameField: 'email'
}, (username, password, done) => {
    userModel.findOne({email: username})
        .then((user) => {
            if (!user) return done(null, false, {'error': 'Usuario no encontrado en email'});
            if(!user.validatePassword(password)) {
                return done(null, false, {'error': 'Contrasena incorrecta en email'});
            }
            return done(null, user);
        }).catch(done);
}));

module.exports = passport;
