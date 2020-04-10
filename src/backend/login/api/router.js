'use strict';

let express = require('express');
let router = new express.Router();  // express router

let controller = require('./controller');

router.get('/', controller.status);
router.post('/', controller.create);
router.put('/', controller.updateAll);
router.patch('/', controller.update);

router.get('/:_id', controller.read);
router.delete('/:_id', controller.destroy);

router.get('/username/:username/', controller.read);
router.get('/list', controller.list);

router.post('/login', controller.login);

module.exports = router;
