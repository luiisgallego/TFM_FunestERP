'use strict';

let request = require('supertest'),
    expect = require('chai').expect;
let mongoose = require('mongoose');
let app = require('../');

let userModel = require('../api/user_model');
let newUser;

describe('User API:', function () {
    this.timeout(10000);

    /* Limpiar la db */
    before(done => {
        userModel.remove({})
            .then(() => done())
    });

    describe('GET /user', () => {
        // this.timeout(10000);

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
                        done();
                    }
                });
        });
    });

    describe('POST /user', () => {
        // this.timeout(10000);

        it('Debe devolver el nuevo usuario creado', done => {
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
                        newUser = res.body;
                        expect(newUser).to.be.instanceOf(Object);
                        expect(newUser).ownProperty('_id');
                        expect(newUser._id).to.not.be.undefined;
                        expect(newUser._id).to.not.be.null;
                        expect(newUser).ownProperty('username');
                        expect(newUser.username).to.equal('user_1');
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
                        done();
                    }
                });
        });

        it('Si falta algún parámetro, debe responder con un error', done => {
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

        it('Si el usuario ya existe, debe responder con un error', done => {
            request(app)
                .post('/user')
                .send({
                    username: 'user_1',
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

        it('Si el email ya existe, debe responder con un error', done => {
            request(app)
                .post('/user')
                .send({
                    username: 'newuser',
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
        // this.timeout(10000);

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
                        expect(result._id).to.not.be.undefined;
                        expect(result._id).to.not.be.null;
                        expect(result).ownProperty('username');
                        expect(result.username).to.equal('user_1');
                        expect(result).ownProperty('password');
                        expect(result.password).to.equal('pass');
                        expect(result).ownProperty('email');
                        expect(result.email).to.equal('correo@correo.com');
                        expect(result).ownProperty('name');
                        expect(result.name).to.equal('name last_name');
                        expect(result).ownProperty('rol');
                        expect(result.rol).to.equal('user');
                        expect(result).ownProperty('createdAt');
                        expect(result.createdAt).to.not.be.undefined;
                        expect(result.createdAt).to.not.be.null;
                        expect(result).to.not.have.ownProperty('updatedAt');
                        done();
                    }
                });
        });

        it('Si el usuario no existe, debe responder con un mensaje de error', done => {
            request(app)
                .get('/user/5e9096e06c93422c6a083ec4')
                .expect('Content-Type', /json/)
                .expect(200)
                .end((err, res) => {
                    if(err) done(err);
                    else {
                        expect(res.body).ownProperty('error');
                        done();
                    }
                });
        });

        it('Si el formato del ObjectId no es correcto, debe responder con un error', done => {
            request(app)
                .get('/user/555')
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

    describe('GET /user/username/:username', () => {
        // this.timeout(10000);

        it('Debe devolver los datos del usuario', done => {
            request(app)
                .get('/user/username/' + newUser.username)
                .expect('Content-Type', /json/)
                .expect(200)
                .end((err, res) => {
                    if(err) return done(err);
                    else {
                        let result = res.body;
                        expect(result).to.be.instanceOf(Object);
                        expect(result).ownProperty('_id');
                        expect(result._id).to.not.be.undefined;
                        expect(result._id).to.not.be.null;
                        expect(result).ownProperty('username');
                        expect(result.username).to.equal('user_1');
                        expect(result).ownProperty('password');
                        expect(result.password).to.equal('pass');
                        expect(result).ownProperty('email');
                        expect(result.email).to.equal('correo@correo.com');
                        expect(result).ownProperty('name');
                        expect(result.name).to.equal('name last_name');
                        expect(result).ownProperty('rol');
                        expect(result.rol).to.equal('user');
                        expect(result).ownProperty('createdAt');
                        expect(result.createdAt).to.not.be.undefined;
                        expect(result.createdAt).to.not.be.null;
                        expect(result).to.not.have.ownProperty('updatedAt');
                        done();
                    }
                });
        });

        it('Si el usuario no existe, debe responder con un mensaje de error', done => {
            request(app)
                .get('/user/username/33333')
                .expect('Content-Type', /json/)
                .expect(200)
                .end((err, res) => {
                    if(err) return done(err);
                    else {
                        expect(res.body).ownProperty('error');
                        done();
                    }
                });
        });
    });

    describe('GET /user/list', () => {
        // this.timeout(10000);

        it('Debe crear un nuevo usuario', done => {
            request(app)
                .post('/user')
                .send({
                    username: 'user_2',
                    password: 'pass_2',
                    email: 'correo2@correo2.com',
                    name: 'name2 last_name2'
                })
                .expect('Content-Type', /json/)
                .expect(200, done)
        });

        it('Debe devolver los usuarios existentes', done => {
            request(app)
                .get('/user/list')
                .expect('Content-Type', /json/)
                .expect(200)
                .end((err, res) => {
                    if(err) return done(err);
                    else {
                        let result = res.body;
                        expect(result[0]).to.be.instanceOf(Object);
                        expect(result[0]).ownProperty('_id');
                        expect(result[0].username).to.equal('user_1');
                        expect(result[0].password).to.equal('pass');
                        expect(result[0].email).to.equal('correo@correo.com');
                        expect(result[0].name).to.equal('name last_name');
                        expect(result[0].rol).to.equal('user');
                        expect(result[0]).ownProperty('createdAt');
                        expect(result[0]).to.not.have.ownProperty('updatedAt');
                        expect(result[1]).to.be.instanceOf(Object);
                        expect(result[1]).ownProperty('_id');
                        expect(result[1].username).to.equal('user_2');
                        expect(result[1].password).to.equal('pass_2');
                        expect(result[1].email).to.equal('correo2@correo2.com');
                        expect(result[1].name).to.equal('name2 last_name2');
                        expect(result[1].rol).to.equal('user');
                        expect(result[1]).ownProperty('createdAt');
                        expect(result[1]).to.not.have.ownProperty('updatedAt');
                        done();
                    }
                });
        });
    });

    describe('PUT /user', () => {
        // this.timeout(10000);

        it('Debe devolver los datos modificados', done => {
            request(app)
                .put('/user')
                .send({
                    _id: newUser._id,
                    username: 'new_user',
                    password: 'other_pass',
                    email: 'other_email@email',
                    name: 'new_name new_last_name',
                    rol: 'user',
                    createdAt: newUser.createdAt
                })
                .expect('Content-Type', /json/)
                .expect(200)
                .end((err, res) => {
                    if(err) return done(err);
                    else {
                        let updatedUser = res.body;
                        expect(updatedUser).to.be.instanceOf(Object);
                        expect(updatedUser).ownProperty('_id');
                        expect(updatedUser._id).to.equal(newUser._id);
                        expect(updatedUser.username).to.equal('new_user');
                        expect(updatedUser.password).to.equal('other_pass');
                        expect(updatedUser.email).to.equal('other_email@email');
                        expect(updatedUser.name).to.equal('new_name new_last_name');
                        expect(updatedUser.rol).to.equal('user');
                        expect(updatedUser).ownProperty('createdAt');
                        expect(updatedUser.createdAt).to.equal(newUser.createdAt);
                        expect(updatedUser).ownProperty('updatedAt');
                        expect(updatedUser.updatedAt).to.not.equal(newUser.updatedAt);
                        done();
                    }
                });
        });

        it('Si no hay _id, debe devolver error', done => {
            request(app)
                .put('/user')
                .send({
                    username: 'other_new_user',
                    password: 'other_other_pass',
                    email: 'other_other_email@email',
                    name: 'other_new_name new_last_name',
                    rol: 'user',
                    createdAt: newUser.createdAt
                })
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

        it('Si el user (_id) no existe, debe devolver un mensaje de error', done => {
            request(app)
                .put('/user')
                .send({
                    _id: new mongoose.Types.ObjectId(),
                    username: 'new_user',
                    password: 'other_other_pass',
                    email: 'other_other_email@email',
                    name: 'other_new_name new_last_name',
                    rol: 'user',
                    createdAt: newUser.createdAt
                })
                .expect('Content-Type', /json/)
                .expect(200)
                .end((err, res) => {
                    if(err) return done(err);
                    else {
                        expect(res.body).ownProperty('error');
                        done();
                    }
                });
        });

        it('Insertamos user para siguiente test', done => {
            request(app)
                .post('/user')
                .send({
                    username: 'user_test',
                    password: 'pass_test',
                    email: 'correo_test@correo.com',
                    name: 'name_test last_name'
                })
                .expect('Content-Type', /json/)
                .expect(200, done)
        });

        it('Si las claves existen, debe devolver error', done => {
            request(app)
                .put('/user')
                .send({
                    _id: newUser._id,
                    username: 'user_test',
                    password: 'other_other_pass',
                    email: 'other_email@email',
                    name: 'other_new_name new_last_name',
                    rol: 'user',
                    createdAt: newUser.createdAt
                })
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

        it('Si las claves son vacias, debe devolver error', done => {
            request(app)
                .put('/user')
                .send({
                    _id: newUser._id,
                    username: '',
                    password: 'other_other_pass',
                    email: 'other_email@email',
                    name: 'other_new_name new_last_name',
                    rol: 'user',
                    createdAt: newUser.createdAt
                })
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

    describe('DELETE /user/:_id', () => {
        // this.timeout(10000);

        it('Debe borrar el usuario', done => {
            request(app)
                .delete('/user/' + newUser._id)
                .expect(204)
                .end((err, res) => {
                    if(err) return done(err);
                    else done();
                });
        });

        it('No debe encontrar al usuario', done => {
            request(app)
                .get('/user/' + newUser._id)
                .expect('Content-Type', /json/)
                .expect(200)
                .end((err, res) => {
                    if(err) return done(err);
                    else {
                        expect(res.body).ownProperty('error');
                        done();
                    }
                });
        });

        it('Si el usuario no existe debe enviar un mensaje de error', done => {
            request(app)
                .delete('/user/' + newUser._id)
                .expect(200)
                .expect('Content-Type', /json/)
                .end((err, res) => {
                    if(err) return done(err);
                    else {
                        expect(res.body).ownProperty('error');
                        done();
                    }
                });
        });

        it('Si el formato del _id no es correcto, debe enviar un error', done => {
            request(app)
                .delete('/user/4444')
                .expect(404)
                .expect('Content-Type', /json/)
                .end((err, res) => {
                    if(err) return done(err);
                    else {
                        expect(res.body).ownProperty('error');
                        done();
                    }
                });
        })
    });

});
