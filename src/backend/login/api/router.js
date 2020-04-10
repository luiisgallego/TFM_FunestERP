'use strict';

let express = require('express');
let router = new express.Router();  // express router

let controller = require('./controller');
let passport = require('./passport');

router.get('/', controller.status);
router.post('/', controller.create);
router.put('/', controller.updateAll);
router.patch('/', controller.update);

router.get('/:_id', controller.read);
router.delete('/:_id', controller.destroy);

router.get('/user_id/:user_id', controller.read_user);
router.get('/list', controller.list);

router.post('/login', (req, res, next) => {

    if (!req.body.username && !req.body.email) {
        return res.status(422).type('json').send({'error': 'No user o email'});
    }

    if (req.body.username) {
        return passport.authenticate('local',   {session: false}, (err, passportUser, info) => {
            if (err) return next(err);
            if (passportUser) return res.status(200).type('json').send(passportUser);
            return res.status(400).send(info);
        })(req, res, next);
    }

    // if (req.body.email) {
    //     return passport.authenticate('local',   {session: false}, (err, passportUser, info) => {
    //         if (err) return next(err);
    //         if (passportUser) return res.status(200).type('json').send(passportUser);
    //         return res.status(400).send(info);
    //     })(req, res, next);
    // }
});

// router.get('/login/email/:email/:password', controller.login);

module.exports = router;
