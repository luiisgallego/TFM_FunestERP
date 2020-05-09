'use strict';

let express = require('express');
let router = new express.Router();  // express router

let controller = require('./controller');

router.get('/', controller.status);
router.get('/:_microservice', controller.read);
router.post('/', controller.create);

module.exports = router;
