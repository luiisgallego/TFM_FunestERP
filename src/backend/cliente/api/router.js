'use strict';

let express = require('express');
let router = new express.Router();  // express router

let controller = require('./controller');

router.get('/', controller.status);
router.post('/', controller.create);
router.put('/', controller.update);
router.get('/list', controller.list);

router.get('/:_id', controller.read);
router.delete('/:_id', controller.destroy);

// Asignar difunto al cliente
router.post('/destroy_difunto', controller.asignarDifunto);
// Eliminar la asociación de dicho difunto al cliente
router.delete('/destroy_difunto', controller.eliminarDifunto);

module.exports = router;
