'use strict';

let request = require('supertest'),
    expect = require('chai').expect;
let mongoose = require('mongoose');
let app = require('../');

let servicioModel = require('../api/servicio_model');
let newServicio;


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

    describe('POST /defuncion/servicio', () => {

        let servicio = new servicioModel({
        });

        it('Debe devolver el nuevo servicio creado', done => {
            request(app)
                .post('defuncion/servicio')
                .send(servicio)
                .expect('Content-Type', /json/)
                .expect(200)
                .end((err, res) => {
                    if(err) return done(err);
                    else {
                        newServicio = res.body;

                        done()
                    }
                });
        });

        it('Si falta algún parámetro, debe responder con un error', done => {
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

        it('Si el servicio ya existe (), debe responder con un error', done => {
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
                .get('/defuncion/servicio/555')
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
                .send({

                })
                .expect('Content-Type', /json/)
                .expect(200, done)
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

                        done()
                    }
                });
        });
    });

    describe('PUT /defuncion/servicio', () => {

        it('Debe devolver los datos modificados', done => {
            request(app)
                .put('/defuncion/servicio')
                .send({

                })
                .expect('Content-Type', /json/)
                .expect(200)
                .end((err, res) => {
                    if(err) return done(err);
                    else {
                        let result = res.body;

                        done()
                    }
                });
        });

        it('Si no hay _id, debe devolver error', done => {
            request(app)
                .put('/defuncion/servicio')
                .send({

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

        it('Insertamos user para siguiente test', done => {
            request(app)
                .post('/defuncion/servicio')
                .send({

                })
                .expect('Content-Type', /json/)
                .expect(200, done)
        });

        it('Si las claves existen, debe devolver error', done => {
            request(app)
                .put('/defuncion/servicio')
                .send({

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
                .put('/defuncion/servicio')
                .send({

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

        it('No debe encontrar al defuncion', done => {
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

        it('Si el defuncion no existe debe enviar un mensaje de error', done => {
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
