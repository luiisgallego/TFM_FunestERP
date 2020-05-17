'use strict';

let request = require('supertest'),
    expect = require('chai').expect,
    nock = require('nock');

let mongoose = require('mongoose'),
    app = require('../'),
    familiaModel = require('../api/familia_model');

let newFamilia, user, difunto;

let familiaExtra = new familiaModel({
    arbol: [
        {
            rol: 'Sobrino',
            value: ['Miguel']
        }
    ],
});


describe('Familia API:', () => {

    /* Limpiar la db */
    before(done => {
        familiaModel.remove({})
            .then(() => done())
    });

    describe('GET /familia', () => {

        it('Debe devolver status OK', done => {
            request(app)
                .get('/familia')
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

    describe('POST MOCKs', () => {

        it('Debe crear un usuario (mock)', done => {
            nock('http://localhost')
                .post('/user')
                .reply(200, {
                    _id: mongoose.Types.ObjectId(),
                    username: 'user',
                    password: 'pass',
                    email: 'correo@correo.com',
                    name: 'name last_name'
                });
            request('http://localhost')
                .post('/user')
                .end((err, res) => {
                    if (err) return done(err);
                    else {
                        user = res.body;
                        expect(user).to.be.instanceOf(Object);
                        expect(user).ownProperty('_id');
                        expect(user._id).to.not.be.undefined;
                        expect(user._id).to.not.be.null;
                        expect(user.username).to.equal('user');
                        expect(user.password).to.equal('pass');
                        expect(user.email).to.equal('correo@correo.com');
                        expect(user.name).to.equal('name last_name');
                        done();
                    }
                });
        });

        it('Debe crear un difunto (mock)', done => {
            nock('http://localhost')
                .post('/defuncion/difunto')
                .reply(200, {
                    _id: mongoose.Types.ObjectId(),
                    nombre: 'nombre_test',
                    DNI: '22334455P'
                });
            request('http://localhost')
                .post('/defuncion/difunto')
                .end((err, res) => {
                    if (err) return done(err);
                    else {
                        difunto = res.body;
                        expect(difunto).to.be.instanceOf(Object);
                        expect(difunto).ownProperty('_id');
                        expect(difunto._id).to.not.be.undefined;
                        expect(difunto._id).to.not.be.null;
                        expect(difunto.nombre).to.equal('nombre_test');
                        expect(difunto.DNI).to.equal('22334455P');
                        done();
                    }
                });
        });
    });

    describe('POST /familia', () => {

        it('Debe devolver la nueva familia creada', done => {

            let familia = new familiaModel({
                arbol: [
                    {
                        rol: 'Hermanos',
                        values: ['Benito', 'Manuel']
                    },
                    {
                        rol: 'Primos',
                        values: ['Antonio', 'Jose']
                    }
                ],
                difunto: difunto._id,
                createdBy: user._id
            });
            request(app)
                .post('/familia')
                .send(familia)
                .expect('Content-Type', /json/)
                .expect(200)
                .end((err, res) => {
                    if (err) return done(err);
                    else {
                        newFamilia = res.body;
                        expect(newFamilia).to.be.instanceOf(Object);
                        expect(newFamilia).ownProperty('_id');
                        expect(newFamilia._id).to.not.be.undefined;
                        expect(newFamilia._id).to.not.be.null;
                        expect(newFamilia).ownProperty('arbol');
                        let arbol = newFamilia.arbol;
                        expect(arbol[0].rol).to.equal('Hermanos');
                        expect(arbol[0].values[0]).to.equal('Benito');
                        expect(arbol[0].values[1]).to.equal('Manuel');
                        expect(arbol[1].rol).to.equal('Primos');
                        expect(arbol[1].values[0]).to.equal('Antonio');
                        expect(arbol[1].values[1]).to.equal('Jose');
                        expect(newFamilia.difunto).to.equal(difunto._id);
                        expect(newFamilia.createdAt).to.not.be.undefined;
                        expect(newFamilia.createdAt).to.not.be.null;
                        expect(newFamilia.createdBy).to.equal(user._id);
                        expect(newFamilia).to.not.have.ownProperty('updatedAt');
                        expect(newFamilia).to.not.have.ownProperty('updatedBy');
                        done();
                    }
                });
        });

        it('Si no hay parámetros, debe responder con un error', done => {
            request(app)
                .post('/familia')
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

        it('Si el arbol es vacio, debe responder con un error', done => {
            request(app)
                .post('/familia')
                .send({ arbol: [] })
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

    describe('GET /familia/:_id', () => {

        it('Debería devolver los datos de la familia', done => {
            request(app)
                .get('/familia/' + newFamilia._id)
                .expect('Content-Type', /json/)
                .expect(200)
                .end((err, res) => {
                    if(err) return done(err);
                    else {
                        let result = res.body;
                        expect(result._id).to.equal(newFamilia._id);
                        let arbol = newFamilia.arbol;
                        expect(arbol[0].rol).to.equal('Hermanos');
                        expect(arbol[0].values[0]).to.equal('Benito');
                        expect(arbol[0].values[1]).to.equal('Manuel');
                        expect(arbol[1].rol).to.equal('Primos');
                        expect(arbol[1].values[0]).to.equal('Antonio');
                        expect(arbol[1].values[1]).to.equal('Jose');
                        expect(result.difunto).to.equal(difunto._id);
                        expect(result.createdBy).to.equal(user._id);
                        expect(result).to.not.have.ownProperty('updatedAt');
                        expect(result).to.not.have.ownProperty('updatedBy');
                        done();
                    }
                });
        });

        it('Si la familia no existe, debe responder con un mensaje de error', done => {
            request(app)
                .get('/familia/5e9096e06c93422c6a083ec4')
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
                .get('/familia/555')
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

    describe('GET /familia/list', () => {

        it('Debe crear una nueva familia', done => {
            request(app)
                .post('/familia')
                .send(familiaExtra)
                .expect('Content-Type', /json/)
                .expect(200, done)
        });

        it('Debe devolver las familias existentes', done => {
            request(app)
                .get('/familia/list')
                .expect('Content-Type', /json/)
                .expect(200)
                .end((err, res) => {
                    if(err) return done(err);
                    else {
                        let result = res.body;
                        expect(result[0]._id).to.equal(newFamilia._id);
                        expect(result[1]._id).to.equal(familiaExtra._id.toString());
                        done();
                    }
                });
        });
    });

    describe('PUT /familia', () => {

        it('Debe devolver los datos modificados', done => {
            request(app)
                .put('/familia')
                .send({
                    _id: newFamilia._id,
                    arbol: [
                        {
                            rol: 'Hermanos',
                            values: ['Benito', 'Manuel']
                        },
                        {
                            rol: 'nuevoRol',
                            values: 'nuevoValue'
                        }
                    ],
                    updatedBy: user._id
                })
                .expect('Content-Type', /json/)
                .expect(200)
                .end((err, res) => {
                    if(err) return done(err);
                    else {
                        let result = res.body;
                        expect(result._id).to.equal(newFamilia._id);
                        let arbol = result.arbol;
                        expect(arbol[0].rol).to.equal('Hermanos');
                        expect(arbol[0].values[0]).to.equal('Benito');
                        expect(arbol[0].values[1]).to.equal('Manuel');
                        expect(arbol[1].rol).to.equal('nuevoRol');
                        expect(arbol[1].values[0]).to.equal('nuevoValue');
                        expect(result.difunto).to.equal(difunto._id);
                        expect(result.createdBy).to.equal(user._id);
                        expect(result.updatedBy).to.equal(user._id);
                        done();
                    }
                });
        });

        it('Si no hay _id, debe devolver error', done => {
            request(app)
                .put('/familia')
                .send({
                    arbol: [
                        {
                            rol: 'nuevoRol2',
                            value: 'nuevoValue2'
                        }
                    ],
                    updatedBy: user._id
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

        it('Si la familia (_id) no existe, debe devolver un mensaje de error', done => {
            request(app)
                .put('/familia')
                .send({
                    _id: new mongoose.Types.ObjectId(),
                    arbol: [
                        {
                            rol: 'nuevoRol2',
                            value: 'nuevoValue2'
                        }
                    ]
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

        it('Si alguna clave es vacia, debe devolver error', done => {
            request(app)
                .put('/familia')
                .send({
                    _id: newFamilia._id,
                    arbol: []
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

    describe('DELETE /familia/:_id', () => {

        it('Debe borrar la familia', done => {
            request(app)
                .delete('/familia/' + newFamilia._id)
                .expect(204)
                .end((err, res) => {
                    if(err) return done(err);
                    else done();
                });
        });

        it('No debe encontrar la familia', done => {
            request(app)
                .get('/familia/' + newFamilia._id)
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

        it('Si la familia no existe debe enviar un mensaje de error', done => {
            request(app)
                .delete('/familia/' + newFamilia._id)
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
                .delete('/familia/4444')
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
