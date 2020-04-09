'use strict';

let request = require('supertest'),
    should = require('chai').should(),
    expect = require('chai').expect;
let app = require('../');

let userModel = require('../api/model');
let newUser;

describe('User API:', () => {

    /* Limpiar la collección */
    before(done => {
        userModel.remove({})
            .then(() => done())
    });

    describe('GET /user', () => {

        it('Debe devolver status OK', done => {
            request(app)
                .get('/user')
                .expect('Content-Type', /json/)
                .expect(200)
                .end((err, res) => {
                    if(err) return done(err);
                    else {
                        let result = res.body;
                        expect(result).ownProperty('status');
                        expect(result.status).to.equal('OK');
                        done()
                    }
                });
        });
    });

    describe('POST /user', () => {

        it('Debe devolver el nuevo usuario creado', done => {
            request(app)
                .post('/user')
                .send({
                    name: 'user',
                    password: 'pass',
                    email: 'correo@gmail.com'
                })
                .expect('Content-Type', /json/)
                .expect(200)
                .end((err, res) => {
                    if(err) return done(err);
                    else {
                        newUser = res.body;
                        expect(newUser).to.be.instanceOf(Object);
                        expect(newUser).ownProperty('_id');
                        expect(newUser).to.not.be.undefined;
                        expect(newUser).to.not.be.null;
                        expect(newUser).ownProperty('name');
                        expect(newUser.name).to.equal('user');
                        expect(newUser).ownProperty('password');
                        expect(newUser.password).to.equal('pass');
                        expect(newUser).ownProperty('email');
                        expect(newUser.email).to.equal('correo@gmail.com');
                        expect(newUser).ownProperty('createdAt');
                        expect(newUser.createdAt).to.not.be.undefined;
                        expect(newUser.createdAt).to.not.be.null;
                        expect(newUser).to.not.have.ownProperty('updatedAt');
                        done()
                    }
                });
        });

        it('Si falta algún parámetro, debe responder con 404', done => {
            request(app)
                .post('/user')
                .send({})
                .expect('Content-Type', /json/)
                .expect(404, done)
        });

        it('Si el usuario ya existe, debe responder con un mensaje de error', done => {
            request(app)
                .post('/user')
                .send({
                    name: 'user',
                    password: 'pass',
                    email: 'new@gmail.com'
                })
                .expect('Content-Type', /json/)
                .expect(404)
                .end((err, res) => {
                    if (err) return done(err);
                    else {
                        let result = res.body;
                        expect(result).ownProperty('error');
                        done();
                    }
                });
        });

        it('Si el email ya existe, debe responder con un mensaje de error', done => {
            request(app)
                .post('/user')
                .send({
                    name: 'newuser',
                    password: 'pass',
                    email: 'correo@gmail.com'
                })
                .expect('Content-Type', /json/)
                .expect(404)
                .end((err, res) => {
                    if (err) return done(err);
                    else {
                        expect(res.body).ownProperty('error');
                        done();
                    }
                });
        });
    });

    describe('GET /user/:_id', () => {

        it('Debería devolver los datos del usuario', done => {
            request(app)
                .get('/user/' + newUser._id)
                .expect('Content-Type', /json/)
                .expect(200)
                .end((err, res) => {
                    if(err) return done(err);
                    else {
                        let result = res.body;
                        expect(result).to.be.instanceOf(Object);
                        expect(result).ownProperty('_id');
                        expect(result).to.not.be.undefined;
                        expect(result).to.not.be.null;
                        expect(result).ownProperty('name');
                        expect(result.name).to.equal('user');
                        expect(result).ownProperty('password');
                        expect(result.password).to.equal('pass');
                        expect(result).ownProperty('email');
                        expect(result.email).to.equal('correo@gmail.com');
                        expect(result).ownProperty('createdAt');
                        expect(result.createdAt).to.not.be.undefined;
                        expect(result.createdAt).to.not.be.null;
                        expect(result).to.not.have.ownProperty('updatedAt');
                        done()
                    }
                });
        });

        it('Si el usuario no existe, debe responder 404', done => {
            request(app)
                .get('/user/33333')
                .send({})
                .expect('Content-Type', /json/)
                .expect(404)
                .end((err, res) => {
                    if(err) return done(err);
                    else {
                        expect(res.body).ownProperty('error');
                        done();
                    }
                });
        });
    });

    describe('PUT /user', () => {

        it('Debe devolver el nombre modificado', done => {
            request(app)
                .put('/user')
                .send({
                    _id: newUser._id,
                    name: 'juan',
                    password: 'contrasena',
                    email: 'email@email'
                })
                .expect(200)
                .expect('Content-Type', /json/)
                .end((err, res) => {
                    if(err) return done(err);
                    else {
                        let updatedUser = res.body;
                        expect(updatedUser).to.be.instanceOf(Object);
                        expect(updatedUser).ownProperty('_id');
                        expect(updatedUser._id).to.equal(newUser._id);
                        expect(updatedUser.name).to.equal('juan');
                        expect(updatedUser.password).to.equal('contrasena');
                        expect(updatedUser.email).to.equal('email@email');
                        expect(updatedUser).ownProperty('createdAt');
                        expect(updatedUser.email).to.equal(newUser.createdAt);
                        expect(updatedUser).ownProperty('updatedAt');
                        expect(updatedUser.updatedAt).to.not.equal(newUser.updatedAt);
                        done()
                    }
                });
        });

        it('Si no hay _id, debe devolver error', done => {
            request(app)
                .put('/user')
                .send({
                    name: 'juan',
                    password: 'contrasena',
                    email: 'email@email'
                })
                .expect(404)
                .end((err, res) => {
                    if(err) return done(err);
                    else {
                        expect(res.body).ownProperty('error');
                        done();
                    }
                });
        });

        it('Si se deja en blanco algún campo, debe devolver error', done => {
            request(app)
                .put('/user')
                .send({
                    _id: newUser._id
                })
                .expect(404)
                .end((err, res) => {
                    if(err) return done(err);
                    else {
                        expect(res.body).ownProperty('error');
                        done();
                    }
                });
        });

        it('Si el nombre existe, debe devolver error', done => {
            request(app)
                .put('/user')
                .send({
                    _id: newUser._id,
                    name: 'juan',
                    password: 'contrasena2',
                    email: 'email2@email2'
                })
                .expect(404)
                .end((err, res) => {
                    if(err) return done(err);
                    else {
                        expect(res.body).ownProperty('error');
                        done();
                    }
                });
        });

        it('Si el email existe, debe devolver error', done => {
            request(app)
                .put('/user')
                .send({
                    _id: newUser._id,
                    name: 'otheruser',
                    password: 'contrasena2',
                    email: 'email@email'
                })
                .expect(404)
                .end((err, res) => {
                    if(err) return done(err);
                    else {
                        expect(res.body).ownProperty('error');
                        done();
                    }
                });
        });
    });

    describe('PATCH /user', () => {

        it('Debe devolver solo el nombre modificado', done => {
            request(app)
                .patch('/user')
                .send({
                    _id: newUser._id,
                    name: 'juan'
                })
                .expect(200)
                .expect('Content-Type', /json/)
                .end((err, res) => {
                    if(err) return done(err);
                    else {
                        let result = res.body;
                        expect(result).to.be.instanceOf(Object);
                        expect(result).ownProperty('_id');
                        expect(result._id).to.equal(user._id);
                        expect(result.name).to.equal('juan');
                        expect(result.password).to.equal('pass');
                        expect(result.email).to.equal('correo@gmail.com');
                        expect(result).ownProperty('createdAt');
                        expect(result).ownProperty('updatedAt');
                        expect(result.updatedAt).to.not.be.undefined;
                        expect(result.updatedAt).to.not.be.null;
                        done()
                    }
                });
        });

        it('Si no hay _id, debe devolver error', () => {

        });

        it('Si no hay ningún campo que actualizar, debe devolver los datos sin modificar', () => {

        });

        it('Si se deja en blanco algún campo obligatorio, debe devolver error',
            () => {

        });

        it('El campo updatedAt debe modificarse siempre que hagamos un update',
            () => {

        });

    });

    describe('DELETE /:_id', () => {
        let result;

        beforeEach(done => {
            request(app)
                .delete('/user/:_id')
                .expect(204)
                .expect('Content-Type', /json/)
                .end((err, res) => {
                    if(err) return done(err);
                    else {
                        result = res.body;
                        done()
                    }
                });
        });

        it('', () => {

        });

        afterEach(() => {
           result = {};
        });
    });

    describe('GET ', () => {
        let result;

        beforeEach(done => {
            request(app)
                .get('/user/:user')
                .expect(200)
                .expect('Content-Type', /json/)
                .end((err, res) => {
                    if(err) return done(err);
                    else {
                        result = res.body;
                        done()
                    }
                });
        });

        it('', () => {

        });
    });

    describe('', () => {
        let result;

        beforeEach(done => {
            request(app)
                .get('/login')
                .expect(200)
                .expect('Content-Type', /json/)
                .end((err, res) => {
                    if(err) return done(err);
                    else {
                        result = res.body;
                        done()
                    }
                });
        });

        it('', () => {

        });
    });

});


