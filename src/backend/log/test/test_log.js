'use strict';

let request = require('supertest'),
    expect = require('chai').expect,
    moment = require('moment'),
    app = require('../');

describe('LOG API:', () => {

    describe('POST /log', () => {

        it('Debe recibir y guardar un nuevo log', done => {
            request(app)
                .post('/log')
                .send({
                    service: 0,
                    method: 'GET',
                    route:  '/ruta',
                    time: moment().format(),
                    input: {
                        'input1': '11',
                        'input2': '22'
                    },
                    output: {
                        'output1': '33',
                        'output2': '44'
                    }
                })
                .expect(200, done)
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

});