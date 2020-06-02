'use strict';

let request = require('supertest'),
    expect = require('chai').expect,
    nock = require('nock'),
    moment = require('moment');

let mongoose = require('mongoose'),
    app = require('../'),
    difuntoModel = require('../api/difunto_model');

let newDifunto, user, cliente, familia, factura, difunto_servicio;

let difuntoExtra = new difuntoModel({
    nombre: 'difunto_extra',
    DNI: '22334455P'
});


describe('Difunto API:', () => {

    /* Limpiar la db */
    before(done => {
        difuntoModel.remove({})
            .then(() => done())
    });

    describe('GET /defuncion/difunto', () => {

        it('Debe devolver status OK', done => {
            request(app)
                .get('/defuncion/difunto')
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

        it('Debe crear un cliente (mock)', done => {
            nock('http://localhost')
                .post('/cliente')
                .reply(200, {
                    _id: mongoose.Types.ObjectId()
                });
            request('http://localhost')
                .post('/cliente')
                .end((err, res) => {
                    if (err) return done(err);
                    else {
                        cliente = res.body;
                        expect(cliente).to.be.instanceOf(Object);
                        expect(cliente).ownProperty('_id');
                        done();
                    }
                });
        });

        it('Debe crear familiares (mock)', done => {
            nock('http://localhost')
                .post('/familia')
                .reply(200, {
                    _id: mongoose.Types.ObjectId()
                });
            request('http://localhost')
                .post('/familia')
                .end((err, res) => {
                    if (err) return done(err);
                    else {
                        familia = res.body;
                        expect(familia).to.be.instanceOf(Object);
                        expect(familia).ownProperty('_id');
                        done();
                    }
                });
        });

        it('Debe crear una factura (mock)', done => {
            nock('http://localhost')
                .post('/factura')
                .reply(200, {
                    _id: mongoose.Types.ObjectId(),
                });
            request('http://localhost')
                .post('/factura')
                .end((err, res) => {
                    if (err) return done(err);
                    else {
                        factura = res.body;
                        expect(factura).to.be.instanceOf(Object);
                        expect(factura).ownProperty('_id');
                        done();
                    }
                });
        });
    });

    describe('POST /defuncion/difunto', () => {

        it('Debe devolver el nuevo difunto creado', done => {

            const fechaNacimiento = moment("2020-01-01").format();
            let difunto = new difuntoModel({
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
                fechaNacimiento: fechaNacimiento,
                estadoCivil: 'casado',
                nombreParejaCivil: 'nombreParejaCivil_test',
                nombrePadre: 'nombrePadre_test',
                nombreMadre: 'nombreMadre_test',
                cliente: cliente._id,
                familia: familia._id,
                factura: factura._id,
                createdBy: user._id
            });

            request(app)
                .post('/defuncion/difunto')
                .send(difunto)
                .expect('Content-Type', /json/)
                .expect(200)
                .end((err, res) => {
                    if(err) return done(err);
                    else {
                        newDifunto = res.body;
                        expect(newDifunto).to.be.instanceOf(Object);
                        expect(newDifunto).ownProperty('_id');
                        expect(newDifunto._id).to.not.be.undefined;
                        expect(newDifunto._id).to.not.be.null;
                        expect(newDifunto).ownProperty('nombre');
                        expect(newDifunto.nombre).to.equal('nombre_test');
                        expect(newDifunto).ownProperty('DNI');
                        expect(newDifunto.DNI).to.equal('77335522J');
                        expect(newDifunto.sexo).to.equal('Hombre');
                        expect(newDifunto.poblacion).to.equal('poblacion_test');
                        expect(newDifunto.provincia).to.equal('provincia_test');
                        expect(newDifunto.calle).to.equal('calle_test');
                        expect(newDifunto.numero).to.equal(50);
                        expect(newDifunto.bloque).to.equal(10);
                        expect(newDifunto.portal).to.equal('4D');
                        expect(newDifunto.codigoPostal).to.equal(23790);
                        expect(newDifunto.fechaNacimiento).to.equal(fechaNacimiento);
                        expect(newDifunto.estadoCivil).to.equal('casado');
                        expect(newDifunto.nombreParejaCivil).to.equal('nombreParejaCivil_test');
                        expect(newDifunto.nombrePadre).to.equal('nombrePadre_test');
                        expect(newDifunto.nombreMadre).to.equal('nombreMadre_test');
                        expect(newDifunto.cliente).to.equal(cliente._id);
                        expect(newDifunto.familia).to.equal(familia._id);
                        expect(newDifunto.factura).to.equal(factura._id);
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
                .post('/defuncion/difunto')
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

        it('Si el difunto ya existe (DNI), debe responder con un error', done => {
            request(app)
                .post('/defuncion/difunto')
                .send({ DNI: newDifunto.DNI })
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

    describe('GET /defuncion/difunto/:_id', () => {

        it('Debería devolver los datos del difunto', done => {
            request(app)
                .get('/defuncion/difunto/' + newDifunto._id)
                .expect('Content-Type', /json/)
                .expect(200)
                .end((err, res) => {
                    if(err) return done(err);
                    else {
                        let result = res.body;
                        expect(result._id).to.equal(newDifunto._id);
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
                        expect(result.fechaNacimiento).to.equal(moment("2020-01-01").format());
                        expect(result.estadoCivil).to.equal('casado');
                        expect(result.nombreParejaCivil).to.equal('nombreParejaCivil_test');
                        expect(result.nombrePadre).to.equal('nombrePadre_test');
                        expect(result.nombreMadre).to.equal('nombreMadre_test');
                        expect(result.cliente).to.equal(cliente._id);
                        expect(result.familia).to.equal(familia._id);
                        expect(result.factura).to.equal(factura._id);
                        expect(result.createdAt).to.not.be.undefined;
                        expect(result.createdAt).to.not.be.null;
                        expect(result.createdBy).to.equal(user._id);
                        expect(result).to.not.have.ownProperty('updatedAt');
                        expect(result).to.not.have.ownProperty('updatedBy');
                        done();
                    }
                });
        });

        it('Si el difunto no existe, debe responder con un mensaje de error', done => {
            request(app)
                .get('/defuncion/difunto/5e9096e06c93422c6a083ec4')
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
                .get('/defuncion/difunto/555')
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

    describe('GET /defuncion/difunto/list', () => {

        beforeEach('Debe crear un nuevo difunto', done => {
            request(app)
                .post('/defuncion/difunto')
                .send(difuntoExtra)
                .expect('Content-Type', /json/)
                .expect(200, done)
        });

        it('Debe devolver los difuntos existentes', done => {
            request(app)
                .get('/defuncion/difunto/list')
                .expect('Content-Type', /json/)
                .expect(200)
                .end((err, res) => {
                    if(err) return done(err);
                    else {
                        let result = res.body;
                        expect(result[0]._id).to.equal(newDifunto._id);
                        expect(result[0].nombre).to.equal(newDifunto.nombre);
                        expect(result[0].DNI).to.equal(newDifunto.DNI);
                        expect(result[1]._id).to.equal(difuntoExtra._id.toString());
                        expect(result[1].nombre).to.equal(difuntoExtra.nombre);
                        expect(result[1].DNI).to.equal(difuntoExtra.DNI);
                        done();
                    }
                });
        });

        afterEach('Debe eliminar el difunto', done => {
            difuntoExtra.remove().then(() => done());
        });
    });

    describe('PUT /defuncion/difunto', () => {

        it('Debe devolver los datos modificados', done => {
            request(app)
                .put('/defuncion/difunto')
                .send({
                    _id: newDifunto._id,
                    nombre: 'nuevo_name',
                    DNI: newDifunto.DNI,
                    updatedBy: user._id
                })
                .expect('Content-Type', /json/)
                .expect(200)
                .end((err, res) => {
                    if(err) return done(err);
                    else {
                        let result = res.body;
                        expect(result._id).to.equal(newDifunto._id);
                        expect(result.nombre).to.equal('nuevo_name');
                        expect(result.DNI).to.equal(newDifunto.DNI);
                        expect(result.sexo).to.equal('Hombre');
                        expect(result.poblacion).to.equal('poblacion_test');
                        expect(result.provincia).to.equal('provincia_test');
                        expect(result.updatedAt).to.not.be.undefined;
                        expect(result.updatedAt).to.not.be.null;
                        expect(result.updatedBy).to.equal(user._id);
                        done();
                    }
                });
        });

        it('Debe permitir modificar los valores de las claves', done => {
            request(app)
                .put('/defuncion/difunto')
                .send({
                    _id: newDifunto._id,
                    nombre: 'nuevo_name',
                    DNI: '11223344P',
                    updatedBy: user._id
                })
                .expect('Content-Type', /json/)
                .expect(200)
                .end((err, res) => {
                    if(err) return done(err);
                    else {
                        let result = res.body;
                        expect(result._id).to.equal(newDifunto._id);
                        expect(result.DNI).to.equal('11223344P');
                        done();
                    }
                });
        });

        it('Si no hay _id, debe devolver error', done => {
            request(app)
                .put('/defuncion/difunto')
                .send({
                    nombre: 'nuevo_name',
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

        it('Si el difunto (_id) no existe, debe devolver un mensaje de error', done => {
            request(app)
                .put('/defuncion/difunto')
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

    });

    describe('DELETE /defuncion/difunto/:_id', () => {
        let cliente_id = mongoose.Types.ObjectId();
        let familia_id = mongoose.Types.ObjectId();
        let difunto_id = mongoose.Types.ObjectId();

        it('Debe crear un difunto y servicio', done => {
            let data = {
                _id: difunto_id,
                nombre: 'nombre_test',
                DNI: '77335522J',
                fechaDefuncion: moment("2020-01-01").format(),
                cliente: cliente_id,
                familia: familia_id,
            };
            request(app)
                .post('/defuncion')
                .send(data)
                .expect('Content-Type', /json/)
                .expect(200)
                .end((err, res) => {
                    if(err) return done(err);
                    else {
                        difunto_servicio = res.body;
                        expect(difunto_servicio).to.be.instanceOf(Object);
                        expect(difunto_servicio.difunto).ownProperty('_id');
                        expect(difunto_servicio.difunto._id).to.equal(difunto_id.toString());
                        expect(difunto_servicio.difunto.nombre).to.equal('nombre_test');
                        expect(difunto_servicio.difunto.DNI).to.equal('77335522J');
                        expect(difunto_servicio.servicio).ownProperty('_id');
                        expect(difunto_servicio.servicio.fechaDefuncion).to.equal(moment("2020-01-01").format());
                        done();
                    }
                });
        });

        it('Debe borrar el difunto', done => {
            nock('http://localhost:3040')
                .delete('/familia/' + familia_id)
                .reply(204, {});
            nock('http://localhost:3030')
                .delete('/cliente/destroy_difunto/' + cliente_id + '/' + difunto_id)
                .reply(204, {});
            request(app)
                .delete('/defuncion/difunto/' + difunto_servicio.difunto._id)
                .expect(204)
                .end((err, res) => {
                    if(err) return done(err);
                    else done();
                });
        });

        it('No debe encontrar al difunto', done => {
            request(app)
                .get('/defuncion/difunto/' + difunto_servicio.difunto._id)
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

        it('Si el difunto no existe debe enviar un mensaje de error', done => {
            request(app)
                .delete('/defuncion/difunto/' + difunto_servicio.difunto._id)
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
                .delete('/defuncion/difunto/4444')
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

    describe('Asociar cliente, familiar y difunto', () => {

        it('Debe crear un nuevo difunto', done => {
            request(app)
                .post('/defuncion/difunto')
                .send(difuntoExtra)
                .expect('Content-Type', /json/)
                .expect(200, done)
        });

        describe('GET /defuncion/difunto/cliente', () => {

            it('Debe devolver las defunciones sin clientes asociados', done => {
                request(app)
                    .get('/defuncion/difunto/cliente')
                    .expect('Content-Type', /json/)
                    .expect(200)
                    .end((err, res) => {
                        if(err) return done(err);
                        else {
                            let result = res.body;
                            expect(result[0]._id).to.equal(difuntoExtra._id.toString());
                            expect(result[0].nombre).to.equal(difuntoExtra.nombre);
                            expect(result[0].DNI).to.equal(difuntoExtra.DNI);
                            expect(result[0].cliente).to.be.undefined;
                            done();
                        }
                    });
            });
        });

        describe('POST /defuncion/difunto/cliente', () => {

            it('Debe asociar un cliente a una defuncion', done => {
                request(app)
                    .post('/defuncion/difunto/cliente')
                    .send({
                        _id: difuntoExtra._id,
                        cliente_id: cliente._id
                    })
                    .expect('Content-Type', /json/)
                    .expect(200, done)
            });

            it('Debe verificar que el cliente se ha asociado', done => {
                request(app)
                    .get('/defuncion/difunto/' + difuntoExtra._id)
                    .expect('Content-Type', /json/)
                    .expect(200)
                    .end((err, res) => {
                        if(err) done(err);
                        else {
                            expect(res.body.cliente).to.equal(cliente._id.toString());
                            done();
                        }
                    });
            });

            it('No debe devolver ninguna defuncion sin cliente', done => {
                request(app)
                    .get('/defuncion/difunto/cliente')
                    .expect('Content-Type', /json/)
                    .expect(200)
                    .end((err, res) => {
                        if(err) return done(err);
                        else {
                            expect(res.body).to.be.empty;
                            done();
                        }
                    });

            });
        });

        describe('GET /defuncion/difunto/familia', () => {

            it('Debe devolver las defunciones sin familiares asociados', done => {
                request(app)
                    .get('/defuncion/difunto/familia')
                    .expect('Content-Type', /json/)
                    .expect(200)
                    .end((err, res) => {
                        if(err) return done(err);
                        else {
                            let result = res.body;
                            expect(result[0]._id).to.equal(difuntoExtra._id.toString());
                            expect(result[0].nombre).to.equal(difuntoExtra.nombre);
                            expect(result[0].DNI).to.equal(difuntoExtra.DNI);
                            expect(result[0].familia).to.be.undefined;
                            done();
                        }
                    });
            });
        });

        describe('POST /defuncion/difunto/familia', () => {

            it('Debe asociar una familia a una defuncion', done => {
                request(app)
                    .post('/defuncion/difunto/familia')
                    .send({
                        _id: difuntoExtra._id,
                        familia_id: familia._id
                    })
                    .expect('Content-Type', /json/)
                    .expect(200, done)
            });

            it('Debe verificar que la familia se ha asociado', done => {
                request(app)
                    .get('/defuncion/difunto/' + difuntoExtra._id)
                    .expect('Content-Type', /json/)
                    .expect(200)
                    .end((err, res) => {
                        if(err) done(err);
                        else {
                            expect(res.body.familia).to.equal(familia._id.toString());
                            done();
                        }
                    });
            });

            it('No debe devolver ninguna defuncion sin familia', done => {
                request(app)
                    .get('/defuncion/difunto/familia')
                    .expect('Content-Type', /json/)
                    .expect(200)
                    .end((err, res) => {
                        if(err) return done(err);
                        else {
                            expect(res.body).to.be.empty;
                            done();
                        }
                    });

            });
        });

        describe('GET /defuncion/difunto/factura', () => {

            it('Debe devolver las defunciones sin facturas asociadas', done => {
                request(app)
                    .get('/defuncion/difunto/factura')
                    .expect('Content-Type', /json/)
                    .expect(200)
                    .end((err, res) => {
                        if(err) return done(err);
                        else {
                            let result = res.body;
                            expect(result[0]._id).to.equal(difuntoExtra._id.toString());
                            expect(result[0].nombre).to.equal(difuntoExtra.nombre);
                            expect(result[0].DNI).to.equal(difuntoExtra.DNI);
                            expect(result[0].factura).to.be.undefined;
                            done();
                        }
                    });
            });
        });

        describe('POST /defuncion/difunto/factura', () => {

            it('Debe asociar una factura a una defuncion', done => {
                request(app)
                    .post('/defuncion/difunto/factura')
                    .send({
                        _id: difuntoExtra._id,
                        factura_id: factura._id
                    })
                    .expect('Content-Type', /json/)
                    .expect(200, done)
            });

            it('Debe verificar que la factura se ha asociado', done => {
                request(app)
                    .get('/defuncion/difunto/' + difuntoExtra._id)
                    .expect('Content-Type', /json/)
                    .expect(200)
                    .end((err, res) => {
                        if(err) done(err);
                        else {
                            expect(res.body.factura).to.equal(factura._id.toString());
                            done();
                        }
                    });
            });

            it('No debe devolver ninguna factura sin cliente', done => {
                request(app)
                    .get('/defuncion/difunto/factura')
                    .expect('Content-Type', /json/)
                    .expect(200)
                    .end((err, res) => {
                        if(err) return done(err);
                        else {
                            expect(res.body).to.be.empty;
                            done();
                        }
                    });

            });
        });

        describe('POST /defuncion/difunto/cliente', () => {

            it('Debe eliminar el cliente en una defuncion', done => {
                request(app)
                    .post('/defuncion/difunto/cliente/eliminar')
                    .send({
                        _id: difuntoExtra._id
                    })
                    .expect('Content-Type', /json/)
                    .expect(200, done)
            });

            it('Debe verificar que el cliente se ha eliminado', done => {
                request(app)
                    .get('/defuncion/difunto/' + difuntoExtra._id)
                    .expect('Content-Type', /json/)
                    .expect(200)
                    .end((err, res) => {
                        if(err) done(err);
                        else {
                            expect(res.body.cliente).to.equal(null);
                            done();
                        }
                    });
            });

            it('Debe devolver una defuncion sin cliente', done => {
                request(app)
                    .get('/defuncion/difunto/cliente')
                    .expect('Content-Type', /json/)
                    .expect(200)
                    .end((err, res) => {
                        if(err) return done(err);
                        else {
                            expect(res.body.length).to.equal(1);
                            done();
                        }
                    });

            });
        });
    });
});
