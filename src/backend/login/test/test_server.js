'use strict';

let request = require('supertest'),
    expect = require('chai').expect;
let app = require('../');

let userModel = require('../api/model');
let newUser;

describe('User API:', () => {

    /* Limpiar la db */
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
                    user: 'user_1',
                    password: 'pass',
                    email: 'correo@correo.com',
                    name: 'name last_name'
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
                        expect(newUser).ownProperty('user');
                        expect(newUser.user).to.equal('user_1');
                        expect(newUser).ownProperty('password');
                        expect(newUser.password).to.equal('pass');
                        expect(newUser).ownProperty('email');
                        expect(newUser.email).to.equal('correo@correo.com');
                        expect(newUser).ownProperty('name');
                        expect(newUser.name).to.equal('name last_name');
                        expect(newUser).ownProperty('rol');
                        expect(newUser.rol).to.equal('user');
                        expect(newUser).ownProperty('createdAt');
                        expect(newUser.createdAt).to.not.be.undefined;
                        expect(newUser.createdAt).to.not.be.null;
                        expect(newUser).to.not.have.ownProperty('updatedAt');
                        done()
                    }
                });
        });

        it('Si falta algún parámetro, debe responder con un mensaje de error', done => {
            request(app)
                .post('/user')
                .send({})
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

        it('Si el usuario ya existe, debe responder con un mensaje de error', done => {
            request(app)
                .post('/user')
                .send({
                    user: 'user_1',
                    password: 'pass',
                    email: 'newcorreo@correo.com'
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

        it('Si el email ya existe, debe responder con un mensaje de error', done => {
            request(app)
                .post('/user')
                .send({
                    user: 'newuser',
                    password: 'pass',
                    email: 'correo@correo.com'
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
                        expect(result).ownProperty('user');
                        expect(result.user).to.equal('user_1');
                        expect(result).ownProperty('password');
                        expect(result.password).to.equal('pass');
                        expect(result).ownProperty('email');
                        expect(result.email).to.equal('correo@gmail.com');
                        expect(result).ownProperty('name');
                        expect(result.name).to.equal('name last_name');
                        expect(result).ownProperty('rol');
                        expect(result.rol).to.equal('user');
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

        it('Debe devolver los datos modificados', done => {
            request(app)
                .put('/user')
                .send({
                    _id: newUser._id,
                    user: 'new_user',
                    password: 'other_pass',
                    email: 'other_email@email',
                    name: 'new_name new_last_name',
                    rol: 'user',
                    createdAt: newUser.createdAt
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
                        expect(updatedUser.user).to.equal('new_user');
                        expect(updatedUser.password).to.equal('other_pass');
                        expect(updatedUser.email).to.equal('other_email@email');
                        expect(updatedUser.name).to.equal('new_name new_last_name');
                        expect(updatedUser.rol).to.equal('user');
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
                    user: 'other_new_user',
                    password: 'other_other_pass',
                    email: 'other_other_email@email',
                    name: 'other_new_name new_last_name',
                    rol: 'user',
                    createdAt: newUser.createdAt
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
                .send({ _id: newUser._id })
                .expect(404)
                .end((err, res) => {
                    if(err) return done(err);
                    else {
                        expect(res.body).ownProperty('error');
                        done();
                    }
                });
        });

        it('Si el user existe, debe devolver error', done => {
            request(app)
                .put('/user')
                .send({
                    _id: newUser._id,
                    user: 'new_user',
                    password: 'other_other_pass',
                    email: 'other_other_email@email',
                    name: 'other_new_name new_last_name',
                    rol: 'user',
                    createdAt: newUser.createdAt
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
                    user: 'other_new_user',
                    password: 'other_other_pass',
                    email: 'other_email@email',
                    name: 'other_new_name new_last_name',
                    rol: 'user',
                    createdAt: newUser.createdAt
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
                    user: 'new_user_2'
                })
                .expect(200)
                .expect('Content-Type', /json/)
                .end((err, res) => {
                    if(err) return done(err);
                    else {
                        let result = res.body;
                        expect(result).to.be.instanceOf(Object);
                        expect(result).ownProperty('_id');
                        expect(result._id).to.equal(newUser._id);
                        expect(result.user).to.equal('new_user_2');
                        expect(result.password).to.equal('other_pass');
                        expect(result.email).to.equal('other_email@email');
                        expect(result.name).to.equal('new_name new_last_name');
                        expect(result.rol).to.equal('user');
                        expect(result).ownProperty('createdAt');
                        expect(result.email).to.equal(newUser.createdAt);
                        expect(result).ownProperty('updatedAt');
                        expect(result.updatedAt).to.not.equal(newUser.updatedAt);
                        done()
                    }
                });
        });

        it('Si no hay _id, debe devolver error', done => {
            request(app)
                .patch('/user')
                .send({ user: 'new_user' })
                .expect(404)
                .end((err, res) => {
                    if(err) return done(err);
                    else {
                        expect(res.body).ownProperty('error');
                        done();
                    }
                });
        });

        it('Si no hay ningún campo que actualizar, debe devolver error', done => {
            request(app)
                .patch('/user')
                .send({ _id: newUser._id })
                .expect(404)
                .end((err, res) => {
                    if(err) return done(err);
                    else {
                        expect(res.body).ownProperty('error');
                        done();
                    }
                });
        });

        it('Si se deja en blanco algún campo obligatorio, debe devolver error', done => {
            request(app)
                .patch('/user')
                .send({
                    _id: newUser._id,
                    user: ''
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

        it('Si el user existe, debe devolver error', done => {
            request(app)
                .patch('/user')
                .send({
                    _id: newUser._id,
                    user: 'new_user'
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
                .patch('/user')
                .send({
                    _id: newUser._id,
                    email: 'other_email@email',
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

    describe('DELETE /user/:_id', () => {

        it('Debe borrar el usuario', done => {
            request(app)
                .delete('/user/' + newUser._id)
                .expect(204)
                .expect('Content-Type', /json/)
                .end((err, res) => {
                    if(err) return done(err);
                    else done()
                });
        });

        it('Si el usuario no existe, debe devolver eror', done => {
            request(app)
                .delete('/user/' + newUser._id)
                .expect(404)
                .expect('Content-Type', /json/)
                .end((err, res) => {
                    if(err) return done(err);
                    else {
                        expect(res.body).ownProperty('error');
                        done();
                    }
                });
        });
    });

});


