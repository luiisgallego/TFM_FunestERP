'use strict';

let request = require('supertest'),
    expect = require('chai').expect,
    nock = require('nock'),
    moment = require('moment');

let mongoose = require('mongoose'),
    app = require('../'),
    clienteModel = require('../api/cliente_model');

let newCliente, user, difunto;

let clienteExtra = new clienteModel({
    nombre: 'cliente_extra',
    DNI: '22334455P'
});


describe('Cliente API:', () => {

    /* Limpiar la db */
    before(done => {
        clienteModel.remove({})
            .then(() => done())
    });

    describe('GET /cliente', () => {

        it('Debe devolver status OK', done => {
            request(app)
                .get('/cliente')
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

    describe('POST /cliente', () => {

        it('Debe devolver el nuevo cliente creado', done => {

            let cliente = new clienteModel({
                nombre: 'nombre_test',
                DNI: '77335522J',
                poblacion: 'poblacion_test',
                provincia: 'provincia_test',
                calle: 'calle_test',
                numero: 50,
                bloque: 10,
                portal: '4D',
                codigoPostal: 23790,
                telefono: '999885566',
                email: 'correo@correo.com',
                cuentaBancaria: 'ES0011112222334444444444',
                difunto: difunto._id,
                createdBy: user._id
            });

            request(app)
                .post('/cliente')
                .send(cliente)
                .expect('Content-Type', /json/)
                .expect(200)
                .end((err, res) => {
                    if (err) return done(err);
                    else {
                        newCliente = res.body;
                        expect(newCliente).to.be.instanceOf(Object);
                        expect(newCliente).ownProperty('_id');
                        expect(newCliente._id).to.not.be.undefined;
                        expect(newCliente._id).to.not.be.null;
                        expect(newCliente).ownProperty('nombre');
                        expect(newCliente.nombre).to.equal('nombre_test');
                        expect(newCliente).ownProperty('DNI');
                        expect(newCliente.DNI).to.equal('77335522J');
                        expect(newCliente.poblacion).to.equal('poblacion_test');
                        expect(newCliente.provincia).to.equal('provincia_test');
                        expect(newCliente.calle).to.equal('calle_test');
                        expect(newCliente.numero).to.equal(50);
                        expect(newCliente.bloque).to.equal(10);
                        expect(newCliente.portal).to.equal('4D');
                        expect(newCliente.codigoPostal).to.equal(23790);
                        expect(newCliente.telefono).to.equal('999885566');
                        expect(newCliente.email).to.equal('correo@correo.com');
                        expect(newCliente.cuentaBancaria).to.equal('ES0011112222334444444444');
                        expect(newCliente.difunto).to.equal(difunto._id);
                        expect(newCliente.createdAt).to.not.be.undefined;
                        expect(newCliente.createdAt).to.not.be.null;
                        expect(newCliente.createdBy).to.equal(user._id);
                        expect(newCliente).to.not.have.ownProperty('updatedAt');
                        expect(newCliente).to.not.have.ownProperty('updatedBy');
                        done();
                    }
                });
        });

        it('Si falta algún parámetro, debe responder con un error', done => {
            request(app)
                .post('/cliente')
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

        it('Si el cliente ya existe (DNI), debe responder con un error', done => {
            request(app)
                .post('/cliente')
                .send({ DNI: newCliente.DNI })
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

    describe('GET /cliente/:_id', () => {

        it('Debería devolver los datos del cliente', done => {
            request(app)
                .get('/cliente/' + newCliente._id)
                .expect('Content-Type', /json/)
                .expect(200)
                .end((err, res) => {
                    if(err) return done(err);
                    else {
                        let result = res.body;
                        expect(result._id).to.equal(newCliente._id);
                        expect(result.nombre).to.equal('nombre_test');
                        expect(result.DNI).to.equal('77335522J');
                        expect(result.poblacion).to.equal('poblacion_test');
                        expect(result.provincia).to.equal('provincia_test');
                        expect(result.calle).to.equal('calle_test');
                        expect(result.numero).to.equal(50);
                        expect(result.bloque).to.equal(10);
                        expect(result.portal).to.equal('4D');
                        expect(result.codigoPostal).to.equal(23790);
                        expect(result.telefono).to.equal('999885566');
                        expect(result.email).to.equal('correo@correo.com');
                        expect(result.cuentaBancaria).to.equal('ES0011112222334444444444');
                        expect(result.difunto).to.equal(difunto._id);
                        expect(result.createdAt).to.not.be.undefined;
                        expect(result.createdAt).to.not.be.null;
                        expect(result.createdBy).to.equal(user._id);
                        expect(result).to.not.have.ownProperty('updatedAt');
                        expect(result).to.not.have.ownProperty('updatedBy');
                        done();
                    }
                });
        });

        it('Si el cliente no existe, debe responder con un mensaje de error', done => {
            request(app)
                .get('/cliente/5e9096e06c93422c6a083ec4')
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
                .get('/cliente/555')
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

    describe('GET /cliente/list', () => {

        beforeEach('Debe crear un nuevo cliente', done => {
            request(app)
                .post('/cliente')
                .send(clienteExtra)
                .expect('Content-Type', /json/)
                .expect(200, done)
        });

        it('Debe devolver los clientes existentes', done => {
            request(app)
                .get('/cliente/list')
                .expect('Content-Type', /json/)
                .expect(200)
                .end((err, res) => {
                    if(err) return done(err);
                    else {
                        let result = res.body;
                        expect(result[0]._id).to.equal(newCliente._id);
                        expect(result[0].nombre).to.equal(newCliente.nombre);
                        expect(result[0].DNI).to.equal(newCliente.DNI);
                        expect(result[1]._id).to.equal(clienteExtra._id.toString());
                        expect(result[1].nombre).to.equal(clienteExtra.nombre);
                        expect(result[1].DNI).to.equal(clienteExtra.DNI);
                        done();
                    }
                });
        });

        afterEach('Debe eliminar el cliente', done => {
            clienteExtra.remove().then(() => done());
        });
    });

    describe('PUT /cliente', () => {

        it('Debe devolver los datos modificados', done => {
            request(app)
                .put('/cliente')
                .send({
                    _id: newCliente._id,
                    nombre: 'nuevo_name',
                    DNI: '11223344P',
                    updatedBy: user._id
                })
                .expect('Content-Type', /json/)
                // .expect(200)
                .end((err, res) => {
                    if(err) return done(err);
                    else {
                        let result = res.body;
                        expect(result._id).to.equal(newCliente._id);
                        expect(result.nombre).to.equal('nuevo_name');
                        expect(result.DNI).to.equal('11223344P');
                        expect(result.poblacion).to.equal('poblacion_test');
                        expect(result.provincia).to.equal('provincia_test');
                        expect(result.updatedAt).to.not.be.undefined;
                        expect(result.updatedAt).to.not.be.null;
                        expect(result.updatedBy).to.equal(user._id);
                        done();
                    }
                });
        });

        it('Si no hay _id, debe devolver error', done => {
            request(app)
                .put('/cliente')
                .send({
                    name: 'nuevo_name',
                    DNI: '11223344P',
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

        it('Si el cliente (_id) no existe, debe devolver un mensaje de error', done => {
            request(app)
                .put('/cliente')
                .send({ _id: new mongoose.Types.ObjectId() })
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

        it('Si alguna clave existe, debe devolver error', done => {
            request(app)
                .put('/cliente')
                .send({
                    _id: newCliente._id,
                    DNI: '11223344P',
                    nombre: 'other_name'
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

        it('Si alguna clave es vacia, debe devolver error', done => {
            request(app)
                .put('/cliente')
                .send({
                    _id: newCliente._id,
                    name: 'nuevo_name'
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

    describe('DELETE /cliente/:_id', () => {

        it('Debe borrar el cliente', done => {
            request(app)
                .delete('/cliente/' + newCliente._id)
                .expect(204)
                .end((err, res) => {
                    if(err) return done(err);
                    else done();
                });
        });

        it('No debe encontrar al cliente', done => {
            request(app)
                .get('/cliente/' + newCliente._id)
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

        it('Si el cliente no existe debe enviar un mensaje de error', done => {
            request(app)
                .delete('/cliente/' + newCliente._id)
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
                .delete('/cliente/4444')
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
