'use strict';

let request = require('supertest'),
    expect = require('chai').expect;
let app = require('../');

let userModel = require('../api/user_model');
let user;

describe('User login: ', () => {

    /* Limpiar la db */
    before(done => {
        userModel.remove({})
            .then(() => done())
    });

    describe('GET /user/login (username)', () => {

        it('Insertar usuario', done => {
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
                        expect(result._id).to.equal(user._id);
                        expect(result.username).to.equal(user.username);
                        expect(result.password).to.equal(user.password);
                        expect(result.email).to.equal(user.email);
                        expect(result.name).to.equal(user.name);
                        expect(result.rol).to.equal(user.rol);
                        expect(result.createdAt).to.equal(user.createdAt);
                        done()
                    }
                });
        });

        it('Si la contraseña es incorrecta, debe devolver un mensaje de error', done => {
            request(app)
                .post('/user/login')
                .send({
                    username: user.username,
                    password: 'bad_pass'
                })
                .expect('Content-Type', /json/)
                .expect(401)
                .end((err, res) => {
                    if(err) return done(err);
                    else {
                        expect(res.body).ownProperty('error');
                        done()
                    }
                });
        });

        it('Si no hay contraseña, debe devolver error', done => {
            request(app)
                .post('/user/login')
                .send({ username: user.username })
                .expect('Content-Type', /json/)
                .expect(404)
                .end((err, res) => {
                    if(err) return done(err);
                    else {
                        expect(res.body).ownProperty('error');
                        done()
                    }
                });
        });

        it('Si no hay username, debe devolver error', done => {
            request(app)
                .post('/user/login')
                .send({ password: user.password })
                .expect('Content-Type', /json/)
                .expect(404)
                .end((err, res) => {
                    if(err) return done(err);
                    else {
                        expect(res.body).ownProperty('error');
                        done()
                    }
                });
        });
    });

    describe('GET /user/login (email)', () => {

        it('Debe devolver login correcto usando email', done => {
            request(app)
                .post('/user/login')
                .send({
                    email: user.email,
                    password: user.password
                })
                .expect('Content-Type', /json/)
                .expect(200)
                .end((err, res) => {
                    if(err) return done(err);
                    else {
                        let result = res.body;
                        expect(result._id).to.equal(user._id);
                        expect(result.username).to.equal(user.username);
                        expect(result.password).to.equal(user.password);
                        expect(result.email).to.equal(user.email);
                        expect(result.name).to.equal(user.name);
                        expect(result.rol).to.equal(user.rol);
                        expect(result.createdAt).to.equal(user.createdAt);
                        done()
                    }
                });
        });

        it('Si la contraseña es incorrecta, debe devolver un mensaje de error', done => {
            request(app)
                .post('/user/login')
                .send({
                    email: user.email,
                    password: 'bad_pass'
                })
                .expect('Content-Type', /json/)
                .expect(401)
                .end((err, res) => {
                    if(err) return done(err);
                    else {
                        expect(res.body).ownProperty('error');
                        done()
                    }
                });
        });

        it('Si no hay contraseña, debe devolver error', done => {
            request(app)
                .post('/user/login')
                .send({ email: user.email  })
                .expect('Content-Type', /json/)
                .expect(404)
                .end((err, res) => {
                    if(err) return done(err);
                    else {
                        expect(res.body).ownProperty('error');
                        done()
                    }
                });
        });

        it('Si no hay email, debe devolver error', done => {
            request(app)
                .post('/user/login')
                .send({ password: 'bad_pass' })
                .expect('Content-Type', /json/)
                .expect(404)
                .end((err, res) => {
                    if(err) return done(err);
                    else {
                        expect(res.body).ownProperty('error');
                        done()
                    }
                });
        });
    });
});
