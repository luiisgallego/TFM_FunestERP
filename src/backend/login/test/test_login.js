'use strict';

let request = require('supertest'),
    expect = require('chai').expect;
let app = require('../');

let userModel = require('../api/model');
let user;

describe('User login: ', () => {

    /* Limpiar la db */
    before(done => {
        userModel.remove({})
            .then(() => done())
    });

    describe('GET /user/login/user_id', () => {

        beforeEach(done => {
            request(app)
                .post('/user')
                .send({
                    user_id: 'user_1',
                    password: 'pass',
                    email: 'correo@correo.com',
                    name: 'name last_name'
                })
                .expect('Content-Type', /json/)
                .expect(200)
                .end((err, res) => {
                    if(err) return done(err);
                    else {
                        user = res.body;
                        done()
                    }
                });
        });

        it('Debe devolver login correcto', done => {
            request(app)
                .get('/user/login/user_id/' + user.user_id + '/' + user.password)
                .expect('Content-Type', /json/)
                .expect(200)
                .end((err, res) => {
                    if(err) return done(err);
                    else {
                        let result = res.body;
                        // añadir comprobaciones
                        done()
                    }
                });
        });

        it('Si la contraseña es incorrecta, debe devolver un mensaje de error', done => {
            request(app)
                .get('/user/login/user_id/' + user.user_id + '/' + user.password)
                .expect('Content-Type', /json/)
                .expect(404)
                .end((err, res) => {
                    if(err) return done(err);
                    else {
                        let result = res.body;
                        // añadir comprobaciones
                        done()
                    }
                });
        });

        it('Si no hay contraseña, debe devolver error', done => {
            request(app)
                .get('/user/login/user_id/' + user.user_id + '/' + user.password)
                .expect('Content-Type', /json/)
                .expect(404)
                .end((err, res) => {
                    if(err) return done(err);
                    else {
                        let result = res.body;
                        // añadir comprobaciones
                        done()
                    }
                });
        });

        it('Si no hay user_id, debe devolver error', done => {
            request(app)
                .get('/user/login/' + user.user_id + '/' + user.password)
                .expect('Content-Type', /json/)
                .expect(404)
                .end((err, res) => {
                    if(err) return done(err);
                    else {
                        let result = res.body;
                        // añadir comprobaciones
                        done()
                    }
                });
        });
    });

    describe('GET /user/login/email', () => {

        it('Debe devolver login correcto usando email y pass', done => {
            request(app)
                .get('/user/login/email/' + user.email + '/' + user.password)
                .expect('Content-Type', /json/)
                .expect(200)
                .end((err, res) => {
                    if(err) return done(err);
                    else {
                        let result = res.body;
                        // añadir comprobaciones
                        done()
                    }
                });
        });

        it('Si la contraseña es incorrecta, debe devolver un mensaje de error', done => {
            request(app)
                .get('/user/login/email/' + user.email + '/' + user.password)
                .expect('Content-Type', /json/)
                .expect(404)
                .end((err, res) => {
                    if(err) return done(err);
                    else {
                        let result = res.body;
                        // añadir comprobaciones
                        done()
                    }
                });
        });

        it('Si no hay contraseña, debe devolver error', done => {
            request(app)
                .get('/user/login/email/' + user.email + '/' + user.password)
                .expect('Content-Type', /json/)
                .expect(404)
                .end((err, res) => {
                    if(err) return done(err);
                    else {
                        let result = res.body;
                        // añadir comprobaciones
                        done()
                    }
                });
        });

        it('Si no hay email, debe devolver error', done => {
            request(app)
                .get('/user/login/email/' + user.email + '/' + user.password)
                .expect('Content-Type', /json/)
                .expect(404)
                .end((err, res) => {
                    if(err) return done(err);
                    else {
                        let result = res.body;
                        // añadir comprobaciones
                        done()
                    }
                });
        });
    });
});
