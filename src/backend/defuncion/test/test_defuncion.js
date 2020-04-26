'use strict';

let request = require('supertest'),
    expect = require('chai').expect,
    moment = require('moment');

let app = require('../'),
    difuntoModel = require('../api/difunto_model'),
    servicioModel = require('../api/servicio_model');

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

    describe('GET /defuncion/difunto', () => {

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

            let data = {
                nombre: 'nombre_test',
                DNI: '77335522J',
                fechaDefuncion: moment("2020-01-01").format()
            };

            request(app)
                .post('/defuncion')
                .send(data)
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
});
