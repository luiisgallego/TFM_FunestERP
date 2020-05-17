'use strict';

/* Creamos las dependencias */
const express = require('express');
const mongoose = require('mongoose');
const bodyParser = require("body-parser");
const routes = require('./api/router');
const app = express();

/* Configuramos puertos y conexiones */
let server_ip_address = '0.0.0.0';
app.set('puerto', 3040);
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());
// Nombre de entrada de los endpoints del microservicio
app.use('/familia', routes);

/* Conectamos la BD */
let uri_localhost = "mongodb://localhost:27017/familia";
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
    console.log("Familia app corriendo en " + server_ip_address + ':' + app.get('puerto'));
});

module.exports = app;
