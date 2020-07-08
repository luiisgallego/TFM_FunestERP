'use strict';

let request = require('supertest'),
    expect = require('chai').expect,
    moment = require('moment'),
    mongoose = require('mongoose');

let app = require('../'),
    difuntoModel = require('../api/difunto_model'),
    servicioModel = require('../api/servicio_model');

let difunto_servicio = {
    nombre: 'nombre_test',
    DNI: '77335522J',
    fechaDefuncion: moment("2020-01-01").format()
};

let difunto_id;

describe('DEFUNCION API', () => {

    /* Limpiar la db */
    before(done => {
        difuntoModel.remove({})
            .then(() => done());
    });
    before(done => {
        servicioModel.remove({})
            .then(() => done());
    });

    describe('GET /defuncion/', () => {

        it('Debe devolver status OK', done => {
            request(app)
                .get('/defuncion')
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

    describe('POST /defuncion', () => {

        it('Debe devolver los datos de la nueva defuncion completa', done => {
            request(app)
                .post('/defuncion')
                .send(difunto_servicio)
                .expect('Content-Type', /json/)
                .expect(200)
                .end((err, res) => {
                    if(err) return done(err);
                    else {
                        let result = res.body;
                        expect(result).to.be.instanceOf(Object);
                        expect(result.difunto).ownProperty('_id');
                        expect(result.difunto._id).to.not.be.undefined;
                        expect(result.difunto._id).to.not.be.null;
                        expect(result.difunto.nombre).to.equal('nombre_test');
                        expect(result.difunto.DNI).to.equal('77335522J');
                        expect(result.servicio).ownProperty('_id');
                        expect(result.servicio._id).to.not.be.undefined;
                        expect(result.servicio._id).to.not.be.null;
                        expect(result.servicio.fechaDefuncion).to.equal(moment("2020-01-01").format());

                        difunto_id = result.difunto._id;
                        done();
                    }
                });
        });

        it('Si faltan datos del difunto debe devolver error', done => {

            let data = {
                nombre: 'nombre_test2',
                fechaDefuncion: moment("2020-01-01").format()
            };

            request(app)
                .post('/defuncion')
                .send(data)
                .expect('Content-Type', /json/)
                .expect(404)
                .end((err, res) => {
                    if(err) return done(err);
                    else {
                        let result = res.body;
                        expect(result).to.be.instanceOf(Object);
                        expect(result).ownProperty('error');
                        done();
                    }
                });
        });
    });

    describe('GET /defuncion/:_id', () => {

        it('Debe devolver la defunción completa', done => {
            request(app)
                .get('/defuncion/' + difunto_id)
                .expect('Content-Type', /json/)
                .expect(200)
                .end((err, res) => {
                    if(err) return done(err);
                    else {
                        let result = res.body;
                        expect(result.difunto).ownProperty('_id');
                        expect(result.difunto._id).to.equal(difunto_id);
                        expect(result.difunto.nombre).to.equal('nombre_test');
                        expect(result.difunto.DNI).to.equal('77335522J');
                        expect(result.servicio).ownProperty('_id');
                        expect(result.servicio.fechaDefuncion).to.equal(moment("2020-01-01").format());
                        done();
                    }
                });
        });

        it('Si el difunto no existe, debe devolver un mensaje de error', done => {
            request(app)
                .get('/defuncion/' + mongoose.Types.ObjectId())
                .expect('Content-Type', /json/)
                .expect(200)
                .end((err, res) => {
                    if(err) return done(err);
                    else {
                        let result = res.body;
                        expect(result.difunto).to.be.instanceOf(Object);
                        expect(result.servicio).ownProperty('error');
                        done();
                    }
                });
        });
    })
});
