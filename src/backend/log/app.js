'use strict';

/* Creamos las dependencias */
const express = require('express');
const bodyParser = require("body-parser");
const routes = require('./api/router');
const app = express();

/* Configuramos puertos y conexiones */
let server_ip_address = '0.0.0.0';
app.set('puerto', 3050);
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());
// Nombre de entrada de los endpoints del microservicio
app.use('/log', routes);

/* Lanzamos la aplicación */
app.listen(app.get('puerto'), server_ip_address, () => {
    console.log("Log app corriendo en " + server_ip_address + ':' + app.get('puerto'));
});

module.exports = app;
