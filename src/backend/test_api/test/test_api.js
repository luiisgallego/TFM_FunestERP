'use strict';

let request = require('supertest'),
    expect = require('chai').expect,
    nock = require('nock'),
    moment = require('moment');

let mongoose = require('mongoose'),
    app_login = require('../../login'),
    app_defuncion = require('../../defuncion'),
    app_cliente = require('../../cliente'),
    app_familia = require('../../familia'),
    app_log = require('../../log');

describe('STATUS OK', () => {

    describe('GET /defuncion', () => {
        it('Debe devolver status OK', done => {
            request(app_defuncion)
                .get('/defuncion')
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

    describe('GET /cliente', () => {
        it('Debe devolver status OK', done => {
            request(app_cliente)
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

    describe('GET /familia', () => {
        it('Debe devolver status OK', done => {
            request(app_familia)
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

    describe('GET /user', () => {
        it('Debe devolver status OK', done => {
            request(app_login)
                .get('/user')
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

    describe('GET /log', () => {
        it('Debe devolver status OK', done => {
            request(app_log)
                .get('/log')
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

});