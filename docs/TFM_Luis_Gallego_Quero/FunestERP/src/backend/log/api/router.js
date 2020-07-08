'use strict';

let express = require('express');
let router = new express.Router();  // express router

let controller = require('./controller');

router.get('/', controller.status);
router.post('/', controller.create);
// Devuelve todos los logs de un servicio
router.get('/:servicio', controller.read);

module.exports = router;
