'use strict';

/* Creamos las dependencias */
const express = require('express');
const mongoose = require('mongoose');
const bodyParser = require("body-parser");
const routes = require('./api/router');
const passport = require('passport');
// const flash = require('connect-flash');
const app = express();

/* Configuramos puertos y conexiones */
let server_ip_address = '0.0.0.0';
app.set('puerto', 3000);
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());
app.use(require('express-session')({
    secret: 'keyboard cat',
    resave: false,
    saveUninitialized: false
}));
app.use(passport.initialize());
app.use('/user', routes);
// app.use(passport.session());
// app.use(flash());
// app.use(express.static(__dirname + '/public'));


/* Conectamos la BD */
let uri_localhost = "mongodb://localhost:27017/login";
mongoose.connect(uri_localhost, {
    useNewUrlParser: true,
    useUnifiedTopology: true
}, (err, res) => {
    if (err) {
        console.log(`MongoDB connection error: ${err}`);
        process.exit(-1);
    } else {
        console.log('Conectado a la db en: ' + uri_localhost);
    }
});


/* Lanzamos la aplicación */
app.listen(app.get('puerto'), server_ip_address, () => {
    console.log("Login app corriendo en " + server_ip_address + ':' + app.get('puerto'));
});

module.exports = app;
