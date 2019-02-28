/****************************   SERVIDOR    *****************************/

// Dependencias
const express = require('express');
const app = express();

// Configuramos
const server_ip_address = '0.0.0.0';
app.set('puerto', 5000);
app.use(express.urlencoded({extended: true}));
app.use(express.json());

// Importaciones
//require('./rutas')(app);

/*  "/"
*    GET: Devolver status OK
*/
app.get('/', (request, response) => {
    respuesta = { "status" : "OK" };
    response.status(200).type('json').send(respuesta);    
});

// Lanzamos la aplicacion
app.listen(app.get('puerto'), server_ip_address, (error) => {
    if(error) console.log("ERROR SERVIDOR: " + error);
    else console.log("Aplicacion corriendo en " + server_ip_address + ":" + app.get('puerto'));    
});

// Exporta la variable para poder hacer tests
module.exports = app;