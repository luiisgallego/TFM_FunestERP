'use strict';

let express = require('express');
let router = new express.Router();  // express router

let difuntoController = require('./difunto_controller');
let servicioController = require('./servicio_controller');
let controller = require('./controller');

// Trabajan con la info de difunto y servicio en conjunto
router.get('/', controller.status);
router.post('/', controller.create);
router.put('/', controller.update);
router.get('/list', controller.list);

router.get('/difunto', difuntoController.status);
router.post('/difunto', difuntoController.create);
// Debe añadir el ID de un usuario como updater
router.put('/difunto', difuntoController.update);
router.get('/difunto/list', difuntoController.list);

router.get('difunto/cliente', difuntoController.getNoClientes);
router.get('difunto/familiar', difuntoController.getNoFamilia);
router.get('difunto/factura', difuntoController.getNoFactura);
router.post('difunto/cliente', difuntoController.asignarCliente);
router.post('difunto/familia', difuntoController.asignarFamilia);
router.post('difunto/factura', difuntoController.asignarFactura);

router.get('/servicio', servicioController.status);
router.post('/servicio', servicioController.create);
router.put('/servicio', servicioController.update);
router.get('/servicio/list', servicioController.list);

router.get('/:_id', controller.read);
// Solo si el usuario es 'Administrador' puede borrar.
router.delete('/:_id', controller.destroy);

router.get('/difunto/:_id', controller.read);
router.delete('/difunto/:_id', controller.destroy);

router.get('/servicio/:_id', controller.read);
router.delete('/servicio/:_id', controller.destroy);

module.exports = router;
