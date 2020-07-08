'use strict';

let request = require('supertest'),
    expect = require('chai').expect,
    moment = require('moment'),
    app = require('../');

let logModel = require('../api/log_model');

describe('LOG API:', () => {

    /* Limpiar la db */
    before(done => {
        logModel.remove({})
            .then(() => done())
    });

    describe('POST /log', () => {

        it('Debe guardar el nuevo log', done => {
            request(app)
                .post('/log')
                .send({
                    service: 0,
                    method: 'GET',
                    route:  '/ruta',
                    time: moment().format(),
                    status: 200,
                    input: {
                        'input1': '11',
                        'input2': '22'
                    },
                    output: {
                        'output1': '33',
                        'output2': '44'
                    }
                })
                .expect(204, done)
        });

        it('Si la peticion es vacia, debe devolver error', done => {
            request(app)
                .post('/log')
                .send({})
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

    describe('GET /log/:servicio', () => {

        it('Debe devolver los logs del servicio', done => {
            request(app)
                .get('/log/0')
                .expect('Content-Type', /json/)
                .expect(200)
                .end((err, res) => {
                    if(err) done(err);
                    else {
                        let result = res.body;
                        expect(result[0].service).to.equal('DEFUNCION');
                        expect(result[0].method).to.equal('GET');
                        expect(result[0].route).to.equal('/ruta');
                        expect(result[0].status).to.equal(200);
                        expect(result[0].input.input1).to.equal('11');
                        expect(result[0].output.output2).to.equal('44');
                        done();
                    }
                });
        });

        it('Si no hay logs para ese servicio, devuelve vacio ', done => {
            request(app)
                .get('/log/1')
                .expect('Content-Type', /json/)
                .expect(200)
                .end((err, res) => {
                    if(err) done(err);
                    else {
                        expect(res.body).to.have.lengthOf(0);
                        done();
                    }
                });
        });
    });
});