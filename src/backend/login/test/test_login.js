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

    describe('GET /user/login/username', () => {

        beforeEach(done => {
            request(app)
                .post('/user')
                .send({
                    username: 'user_1',
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
                .post('/user/login')
                .send({
                    username: user.username,
                    password: user.password
                })
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
                .post('/user/login')
                .send({
                    username: user.username,
                    password: user.password
                })
                .expect('Content-Type', /json/)
                .expect(400)
                .end((err, res) => {
                    if(err) return done(err);
                    else {
                        let result = res.body;
                        console.log('LOGIN CORRECTO');
                        console.log(result);
                        // añadir comprobaciones
                        done()
                    }
                });
        });

        it('Si no hay contraseña, debe devolver error', done => {
            request(app)
                .get('/user/login/username/' + user.username + '/' + user.password)
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

        it('Si no hay username, debe devolver error', done => {
            request(app)
                .get('/user/login/' + user.username + '/' + user.password)
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

    // describe('GET /user/login/email', () => {
    //
    //     it('Debe devolver login correcto usando email y pass', done => {
    //         request(app)
    //             .get('/user/login/email/' + user.email + '/' + user.password)
    //             .expect('Content-Type', /json/)
    //             .expect(200)
    //             .end((err, res) => {
    //                 if(err) return done(err);
    //                 else {
    //                     let result = res.body;
    //                     // añadir comprobaciones
    //                     done()
    //                 }
    //             });
    //     });
    //
    //     it('Si la contraseña es incorrecta, debe devolver un mensaje de error', done => {
    //         request(app)
    //             .get('/user/login/email/' + user.email + '/' + user.password)
    //             .expect('Content-Type', /json/)
    //             .expect(404)
    //             .end((err, res) => {
    //                 if(err) return done(err);
    //                 else {
    //                     let result = res.body;
    //                     // añadir comprobaciones
    //                     done()
    //                 }
    //             });
    //     });
    //
    //     it('Si no hay contraseña, debe devolver error', done => {
    //         request(app)
    //             .get('/user/login/email/' + user.email + '/' + user.password)
    //             .expect('Content-Type', /json/)
    //             .expect(404)
    //             .end((err, res) => {
    //                 if(err) return done(err);
    //                 else {
    //                     let result = res.body;
    //                     // añadir comprobaciones
    //                     done()
    //                 }
    //             });
    //     });
    //
    //     it('Si no hay email, debe devolver error', done => {
    //         request(app)
    //             .get('/user/login/email/' + user.email + '/' + user.password)
    //             .expect('Content-Type', /json/)
    //             .expect(404)
    //             .end((err, res) => {
    //                 if(err) return done(err);
    //                 else {
    //                     let result = res.body;
    //                     // añadir comprobaciones
    //                     done()
    //                 }
    //             });
    //     });
    // });
});
