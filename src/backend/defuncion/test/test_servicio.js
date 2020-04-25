'use strict';

let request = require('supertest'),
    expect = require('chai').expect,
    nock = require('nock'),
    moment = require('moment');

let mongoose = require('mongoose'),
    app = require('../');

let servicioModel = require('../api/servicio_model');
let newServicio, user, difunto, servicioExtra;

describe('Servicio API:', () => {

    /* Limpiar la db */
    before(done => {
        servicioModel.remove({})
            .then(() => done())
    });

    describe('GET /defuncion/servicio', () => {

        it('Debe devolver status OK', done => {
            request(app)
                .get('/defuncion/servicio')
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
                    _id: mongoose.Types.ObjectId()
                });
            request('http://localhost')
                .post('/defuncion/difunto')
                .end((err, res) => {
                    if (err) return done(err);
                    else {
                        difunto = res.body;
                        expect(difunto).to.be.instanceOf(Object);
                        expect(difunto).ownProperty('_id');
                        done();
                    }
                });
        });
    });

    describe('POST /defuncion/servicio', () => {

        it('Debe devolver el nuevo servicio creado', done => {

            let servicio = new servicioModel({
                fechaDefuncion: moment("2020-01-01").format(),
                fechaEntierro: moment("2020-01-02").format(),
                fechaMisa: moment("2020-01-05").format(),
                poblacionEntierro: 'Madrid',
                tanatorio: 'no',
                tipoServicio: 'compania',
                compania: 'preventiva',
                incineracion: true,
                difunto: difunto._id,
                createdBy: user._id
            });

            request(app)
                .post('/defuncion/servicio')
                .send(servicio)
                .expect('Content-Type', /json/)
                .expect(200)
                .end((err, res) => {
                    if(err) return done(err);
                    else {
                        newServicio = res.body;
                        expect(newServicio).to.be.instanceOf(Object);
                        expect(newServicio).ownProperty('_id');
                        expect(newServicio._id).to.not.be.undefined;
                        expect(newServicio._id).to.not.be.null;
                        expect(newServicio.fechaDefuncion).to.equal(moment("2020-01-01").format());
                        expect(newServicio.fechaEntierro).to.equal(moment("2020-01-02").format());
                        expect(newServicio.fechaMisa).to.equal(moment("2020-01-05").format());
                        expect(newServicio.poblacionEntierro).to.equal('Madrid');
                        expect(newServicio.tanatorio).to.equal('no');
                        expect(newServicio.tipoServicio).to.equal('compania');
                        expect(newServicio.compania).to.equal('preventiva');
                        expect(newServicio.incineracion).to.equal(true);
                        expect(newServicio.difunto).to.equal(difunto._id);
                        expect(newServicio.createdAt).to.not.be.undefined;
                        expect(newServicio.createdAt).to.not.be.null;
                        expect(newServicio.createdBy).to.equal(user._id);
                        expect(newServicio).to.not.have.ownProperty('updatedAt');
                        expect(newServicio).to.not.have.ownProperty('updatedBy');
                        done()
                    }
                });
        });

        it('Si es vacio, debe responder con un error', done => {
            request(app)
                .post('/defuncion/servicio')
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

        it('Si el servicio ya existe (_id), debe responder con un error', done => {
            request(app)
                .post('/defuncion/servicio')
                .send({
                    _id: newServicio._id,
                    fechaDefuncion: moment().format()
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

        it('Si el valor de un atributo enum es incorrecto, debe responder con un error', done => {
            request(app)
                .post('/defuncion/servicio')
                .send({tanatorio: 'XX'})
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

        it('Si es un particular, no puede tener compania', done => {
            request(app)
                .post('/defuncion/servicio')
                .send({
                    tipoServicio: 'particular',
                    compania: 'preventiva'
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

    describe('GET /defuncion/servicio/:_id', () => {

        it('Debería devolver los datos del servicio', done => {
            request(app)
                .get('/defuncion/servicio/' + newServicio._id)
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
                        expect(result.fechaDefuncion).to.equal(moment("2020-01-01").format());
                        expect(result.fechaEntierro).to.equal(moment("2020-01-02").format());
                        expect(result.fechaMisa).to.equal(moment("2020-01-05").format());
                        expect(result.poblacionEntierro).to.equal('Madrid');
                        expect(result.tanatorio).to.equal('no');
                        expect(result.tipoServicio).to.equal('compania');
                        expect(result.compania).to.equal('preventiva');
                        expect(result.incineracion).to.equal(true);
                        expect(result.difunto).to.equal(difunto._id);
                        expect(result.createdAt).to.not.be.undefined;
                        expect(result.createdAt).to.not.be.null;
                        expect(result.createdBy).to.equal(user._id);
                        expect(result).to.not.have.ownProperty('updatedAt');
                        expect(result).to.not.have.ownProperty('updatedBy');
                        done()
                    }
                });
        });

        it('Si el servicio no existe, debe responder con un mensaje de error', done => {
            request(app)
                .get('/defuncion/servicio/5e9096e06c93422c6a083ec4')
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

    describe('GET /defuncion/servicio/list', () => {

        it('Debe crear un nuevo servicio', done => {
            request(app)
                .post('/defuncion/servicio')
                .send({ fechaDefuncion: moment("2020-01-01").format() })
                .expect('Content-Type', /json/)
                .expect(200)
                .end((err, res) => {
                    if (err) return done(err);
                    else {
                        servicioExtra = res.body;
                        done();
                    }
            });
        });

        it('Debe devolver los servicios existentes', done => {
            request(app)
                .get('/defuncion/servicio/list')
                .expect('Content-Type', /json/)
                .expect(200)
                .end((err, res) => {
                    if(err) return done(err);
                    else {
                        let result = res.body;
                        expect(result[0]._id).to.equal(newServicio._id);
                        expect(result[0].fechaDefuncion).to.equal(moment("2020-01-01").format());
                        expect(result[1]._id).to.equal(servicioExtra._id.toString());
                        expect(result[1].fechaDefuncion).to.equal(moment("2020-01-01").format());
                        done()
                    }
                });
        });
    });

    describe('GET /defuncion/servicio/difunto/:difunto', () => {

        it('Debe devolver los servicios existentes', done => {
            request(app)
                .get('/defuncion/servicio/difunto/' + newServicio.difunto)
                .expect('Content-Type', /json/)
                .expect(200)
                .end((err, res) => {
                    if(err) return done(err);
                    else {
                        let result = res.body;
                        expect(result._id).to.equal(newServicio._id);
                        expect(result.fechaDefuncion).to.equal(moment("2020-01-01").format());
                        done();
                    }
                });
        });

        it('Si no existe servicio con dicho difunto, debe responder con un mensaje de error', done => {
            request(app)
                .get('/defuncion/servicio/difunto/5e9096e06c93422c6a083ec4')
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
                .get('/defuncion/servicio/difunto/555')
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

    describe('PUT /defuncion/servicio', () => {

        it('Debe devolver los datos modificados', done => {
            request(app)
                .put('/defuncion/servicio')
                .send({
                    _id: newServicio._id,
                    fechaDefuncion: moment("2020-10-10").format(),
                    fechaEntierro: moment("2020-11-11").format(),
                    updatedBy: user._id
                })
                .expect('Content-Type', /json/)
                .expect(200)
                .end((err, res) => {
                    if(err) return done(err);
                    else {
                        let result = res.body;
                        expect(result._id).to.equal(newServicio._id);
                        expect(result.fechaDefuncion).to.equal(moment("2020-10-10").format());
                        expect(result.fechaEntierro).to.equal(moment("2020-11-11").format());
                        expect(result.updatedAt).to.not.be.undefined;
                        expect(result.updatedAt).to.not.be.null;
                        expect(result.updatedBy).to.equal(user._id);
                        done()
                    }
                });
        });

        it('Si no hay _id, debe devolver error', done => {
            request(app)
                .put('/defuncion/servicio')
                .send({
                    fechaDefuncion: moment("2020-10-10").format(),
                    fechaEntierro: moment("2020-11-11").format(),
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

        it('Si el servicio (_id) no existe, debe devolver un mensaje de error', done => {
            request(app)
                .put('/defuncion/servicio')
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

    describe('DELETE /defuncion/servicio/:_id', () => {

        it('Debe borrar el servicio', done => {
            request(app)
                .delete('/defuncion/servicio/' + newServicio._id)
                .expect(204)
                .end((err, res) => {
                    if(err) return done(err);
                    else done()
                });
        });

        it('No debe encontrar el servicio', done => {
            request(app)
                .get('/defuncion/servicio/' + newServicio._id)
                .expect('Content-Type', /json/)
                .expect(200)
                .end((err, res) => {
                    if(err) return done(err);
                    else {
                        expect(res.body).ownProperty('error');
                        done()
                    }
                });
        });

        it('Si el servicio no existe debe enviar un mensaje de error', done => {
            request(app)
                .delete('/defuncion/servicio/' + newServicio._id)
                .expect(200)
                .expect('Content-Type', /json/)
                .end((err, res) => {
                    if(err) return done(err);
                    else {
                        expect(res.body).ownProperty('error');
                        done()
                    }
                });
        });

        it('Si el formato del _id no es correcto, debe enviar un error', done => {
            request(app)
                .delete('/defuncion/servicio/4444')
                .expect(404)
                .expect('Content-Type', /json/)
                .end((err, res) => {
                    if(err) return done(err);
                    else {
                        expect(res.body).ownProperty('error');
                        done()
                    }
                });
        })
    });
});
