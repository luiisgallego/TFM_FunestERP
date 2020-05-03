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
                .post('/user')
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

        it('Debe devolver el nuevo difunto creado', done => {

            let cliente = new clienteModel({
                nombre: 'nombre_test',
                DNI: '77335522J',
                sexo: 'Hombre',
                poblacion: 'poblacion_test',
                provincia: 'provincia_test',
                calle: 'calle_test',
                numero: 50,
                bloque: 10,
                portal: '4D',
                codigoPostal: 23790,
                telefono: '999885566',
                email: 'correo@correo.com',
                cuentaBancaria: '99999999999',  // hacer correctamente
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
                        expect(newCliente.sexo).to.equal('Hombre');
                        expect(newCliente.poblacion).to.equal('poblacion_test');
                        expect(newCliente.provincia).to.equal('provincia_test');
                        expect(newCliente.calle).to.equal('calle_test');
                        expect(newCliente.numero).to.equal(50);
                        expect(newCliente.bloque).to.equal(10);
                        expect(newCliente.portal).to.equal('4D');
                        expect(newCliente.codigoPostal).to.equal(23790);
                        expect(newCliente.telefono).to.equal('999885566');
                        expect(newCliente.email).to.equal('correo@correo.com');
                        expect(newCliente.cuentaBancaria).to.equal('99999999999');
                        expect(newDifunto.difunto).to.equal(difunto._id);
                        expect(newDifunto.createdAt).to.not.be.undefined;
                        expect(newDifunto.createdAt).to.not.be.null;
                        expect(newDifunto.createdBy).to.equal(user._id);
                        expect(newDifunto).to.not.have.ownProperty('updatedAt');
                        expect(newDifunto).to.not.have.ownProperty('updatedBy');
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
                        expect(result.sexo).to.equal('Hombre');
                        expect(result.poblacion).to.equal('poblacion_test');
                        expect(result.provincia).to.equal('provincia_test');
                        expect(result.calle).to.equal('calle_test');
                        expect(result.numero).to.equal(50);
                        expect(result.bloque).to.equal(10);
                        expect(result.portal).to.equal('4D');
                        expect(result.codigoPostal).to.equal(23790);
                        expect(result.telefono).to.equal('999885566');
                        expect(result.email).to.equal('correo@correo.com');
                        expect(result.cuentaBancaria).to.equal('99999999999');
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

    describe('PUT ', () => {

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
