'use strict';

/* Creamos las dependencias */
const express = require('express');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const passport = require('passport');
const dotenv = require('dotenv');
const routes = require('./api/router');
// const flash = require('connect-flash');
const app = express();
dotenv.config();

/* Configuramos puertos y conexiones */
let server_ip_address = '0.0.0.0';
app.set('puerto', 3010);
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());
// app.use(require('express-session')({
//     secret: 'keyboard cat',
//     resave: false,
//     saveUninitialized: false
// }));
app.use(passport.initialize());
app.use('/user', routes);
// app.use(passport.session());


/* Conectamos la BD */
const uri_localhost = "mongodb://localhost:27017/user";
const uri_mlab = "mongodb://user:password1@ds044979.mlab.com:44979/login";
let uri_final;
if (process.env.TESTING === 'True') {
    uri_final = uri_localhost;
} else {
    uri_final = uri_mlab;
}
mongoose.connect(uri_final, {
    useNewUrlParser: true,
    useUnifiedTopology: true
}, (err, res) => {
    if (err) {
        console.log(`MongoDB connection error: ${err}`);
        process.exit(-1);
    } else {
        console.log('Conectado a la db en: ' + uri_final);
    }
});


/* Lanzamos la aplicación */
app.listen(app.get('puerto'), server_ip_address, () => {
    console.log("Login app corriendo en " + server_ip_address + ':' + app.get('puerto'));
});

module.exports = app;
