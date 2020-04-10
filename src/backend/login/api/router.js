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

router.get('/user_id/:user_id', controller.read_user);
router.get('/list', controller.list);

router.get('/login/user_id/:user_id/:password', controller.login);
router.get('/login/email/:email/:password', controller.login);


module.exports = router;
