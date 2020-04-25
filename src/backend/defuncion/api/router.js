'use strict';

let express = require('express');
let router = new express.Router();  // express router

let difuntoController = require('./difunto_controller');
let servicioController = require('./servicio_controller');
let controller = require('./defuncion_controller');

// /DEFUNCION/ => Trabajan con la info de difunto y servicio en conjunto
router.get('/', controller.status);
// Debe crear el enlace difunto - servicio
router.post('/', controller.create);
// Debe permitir modificar ambos, pero
router.put('/', controller.update);
router.get('/list', controller.list);

// /DEFUNCION/DIFUNTO
router.get('/difunto', difuntoController.status);
router.post('/difunto', difuntoController.create);
// Debe añadir el ID de un usuario como updater
router.put('/difunto', difuntoController.update);
router.get('/difunto/list', difuntoController.list);

// Para las diferentes asignaciones al difunto
router.get('/difunto/cliente', difuntoController.getNoClientes);
router.get('/difunto/familia', difuntoController.getNoFamilia);
router.get('/difunto/factura', difuntoController.getNoFactura);
router.post('/difunto/cliente', difuntoController.asignarCliente);
router.post('/difunto/familia', difuntoController.asignarFamilia);
router.post('/difunto/factura', difuntoController.asignarFactura);

// /DEFUNCION/SERVICIO
router.get('/servicio', servicioController.status);
router.post('/servicio', servicioController.create);
router.put('/servicio', servicioController.update);
router.get('/servicio/list', servicioController.list);

// /DEFUNCION/DIFUNTO
router.get('/difunto/:_id', difuntoController.read);
router.delete('/difunto/:_id', difuntoController.destroy);

// /DEFUNCION/
router.get('/:_id', controller.read);
// Solo si el usuario es 'Administrador' puede borrar.
router.delete('/:_id', controller.destroy);

// /DEFUNCION/SERVICIO
router.get('/servicio/:_id', controller.read);
router.delete('/servicio/:_id', controller.destroy);

module.exports = router;