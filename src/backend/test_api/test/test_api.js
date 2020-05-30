'use strict';

let request = require('supertest'),
    expect = require('chai').expect,
    nock = require('nock'),
    moment = require('moment');

let mongoose = require('mongoose');

let app_login = require('../../login'),
    app_defuncion = require('../../defuncion'),
    app_cliente = require('../../cliente'),
    app_familia = require('../../familia'),
    app_log = require('../../log');

let userModel = require('../../login/api/user_model'),
    difuntoModel = require('../../defuncion/api/difunto_model'),
    servicioModel = require('../../defuncion/api/servicio_model'),
    clienteModel = require('../../cliente/api/cliente_model'),
    familiaModel = require('../../familia/api/familia_model'),
    logModel = require('../../log/api/log_model');

let user = {
    username: 'username',
    password: 'password',
    email: 'correo@correo.com',
    name: 'name',
    rol: 'admin'
};


describe('Test API', () => {

    before(done => {
        userModel.remove({})
            .then();
        difuntoModel.remove({})
            .then();
        servicioModel.remove({})
            .then();
        clienteModel.remove({})
            .then();
        familiaModel.remove({})
            .then();
        logModel.remove({})
            .then();
        done()
    });

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
                            expect(res.body.status).to.equal('OK');
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
                            expect(res.body.status).to.equal('OK');
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
                            expect(res.body.status).to.equal('OK');
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
                            expect(res.body.status).to.equal('OK');
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
                            expect(res.body.status).to.equal('OK');
                            done();
                        }
                    });
            });
        });
    });

    describe('Creamos un nuevo usuario y hacemos login', () => {

        it('Debe crear un nuevo usuario', done => {
            request(app_login)
                .post('/user')
                .send(user)
                .expect('Content-Type', /json/)
                .expect(200)
                .end((err, res) => {
                    if(err) return done(err);
                    else {
                        let result = res.body;
                        expect(result).ownProperty('_id');
                        user._id = result._id;
                        expect(result.username).to.equal(user.username);
                        expect(result).ownProperty(user.password);   // encriptada
                        expect(result.password).to.not.be.undefined;
                        expect(result.password).to.not.be.null;
                        user.password_encriptado = result.password;
                        expect(result.email).to.equal(user.email);
                        expect(result.name).to.equal(user.name);
                        expect(result.rol).to.equal(user.rol);
                        done();
                    }
                });
        });

        it('Debe devolver login correcto', done => {
            request(app_login)
                .post('/user/login')
                .send({
                    username: user.username,
                    password: user.password
                })
                .expect('Content-Type', /json/)
                .expect(200)
                .end((err, res) => {
                    if(err) return done(err);
                    else {
                        let result = res.body;
                        expect(result._id).to.equal(user._id);
                        expect(result.username).to.equal(user.username);
                        expect(result.password).to.equal(user.password_encriptado);
                        expect(result.email).to.equal(user.email);
                        expect(result.name).to.equal(user.name);
                        expect(result.rol).to.equal(user.rol);
                        done()
                    }
                });
        });

        it('Si la contraseña es incorrecta....', done => {
            request(app_login)
                .post('/user/login')
                .send({
                    username: user.username,
                    password: 'xxx'
                })
                .expect('Content-Type', /json/)
                .expect(401, done)
        });

    });

    // describe('El usuario trabaja con las defunciones...', () => {
    //
    //     // - Usuario crea nueva defunción
	//     // - Usuario modifica datos de la defunción
	//     // - Usuario crea una nueva defunción
	//     // - Usuario lista las defunciones
    //
    //
    //     it('Debe crear una nueva defuncion', done => {
    //         request()
    //             .get('/')
    //             .expect('Content-Type', /json/)
    //             .expect(200)
    //             .end((err, res) => {
    //                 if(err) return done(err);
    //                 else {
    //                     expect().to.equal();
    //                     done();
    //                 }
    //             });
    //     });
    //     it('', done => {
    //         request()
    //             .get('/')
    //             .expect('Content-Type', /json/)
    //             .expect(200)
    //             .end((err, res) => {
    //                 if(err) return done(err);
    //                 else {
    //                     expect().to.equal();
    //                     done();
    //                 }
    //             });
    //     });
    //
    //
    // });
    //
    // describe('El usuario trabaja con los clientes...', () => {
    //
    //     // - Usuario consulta los clientes sin asignar ... no hay ninguno
    //     // - Usuario crea un cliente (y no lo asigna)
    //     // - Comprueba de nuevo
    //     // - Asigna cliente a defunción
    //     // - Ahora realizamos las modificaciones, listados y demás como en defunción
    //     // - Crea otro cliente que lo asigna directamente
    //
    //
    //
    //     it('', done => {
    //         request()
    //             .get('/')
    //             .expect('Content-Type', /json/)
    //             .expect(200)
    //             .end((err, res) => {
    //                 if(err) return done(err);
    //                 else {
    //                     expect().to.equal();
    //                     done();
    //                 }
    //             });
    //     });
    //     it('', done => {
    //         request()
    //             .get('/')
    //             .expect('Content-Type', /json/)
    //             .expect(200)
    //             .end((err, res) => {
    //                 if(err) return done(err);
    //                 else {
    //                     expect().to.equal();
    //                     done();
    //                 }
    //             });
    //     });
    //
    //
    //
    //     it('', done => {
    //         request()
    //             .get('/')
    //             .expect('Content-Type', /json/)
    //             .expect(200)
    //             .end((err, res) => {
    //                 if(err) return done(err);
    //                 else {
    //                     expect().to.equal();
    //                     done();
    //                 }
    //             });
    //     });
    //     it('', done => {
    //         request()
    //             .get('/')
    //             .expect('Content-Type', /json/)
    //             .expect(200)
    //             .end((err, res) => {
    //                 if(err) return done(err);
    //                 else {
    //                     expect().to.equal();
    //                     done();
    //                 }
    //             });
    //     });
    //
    //
    //
    // });
    //
    // describe('El usuario trabaja con los familiares...', () => {
    //
    // // - Mismo proceso para familiar
	//     // - ... no podemos crear familiar sin defunción (importante trabajar en torno a este caso)
    //
    //
    //
    //     it('', done => {
    //         request()
    //             .get('/')
    //             .expect('Content-Type', /json/)
    //             .expect(200)
    //             .end((err, res) => {
    //                 if(err) return done(err);
    //                 else {
    //                     expect().to.equal();
    //                     done();
    //                 }
    //             });
    //     });
    //     it('', done => {
    //         request()
    //             .get('/')
    //             .expect('Content-Type', /json/)
    //             .expect(200)
    //             .end((err, res) => {
    //                 if(err) return done(err);
    //                 else {
    //                     expect().to.equal();
    //                     done();
    //                 }
    //             });
    //     });
    //
    //
    //     it('', done => {
    //         request()
    //             .get('/')
    //             .expect('Content-Type', /json/)
    //             .expect(200)
    //             .end((err, res) => {
    //                 if(err) return done(err);
    //                 else {
    //                     expect().to.equal();
    //                     done();
    //                 }
    //             });
    //     });
    //     it('', done => {
    //         request()
    //             .get('/')
    //             .expect('Content-Type', /json/)
    //             .expect(200)
    //             .end((err, res) => {
    //                 if(err) return done(err);
    //                 else {
    //                     expect().to.equal();
    //                     done();
    //                 }
    //             });
    //     });
    //
    // });
    //
    // describe('El usuario elimina una defuncion...', () => {
    //
    //     // - Usuario elimina defunción
    //
    //
    //
    //     it('', done => {
    //         request()
    //             .get('/')
    //             .expect('Content-Type', /json/)
    //             .expect(200)
    //             .end((err, res) => {
    //                 if(err) return done(err);
    //                 else {
    //                     expect().to.equal();
    //                     done();
    //                 }
    //             });
    //     });
    //     it('', done => {
    //         request()
    //             .get('/')
    //             .expect('Content-Type', /json/)
    //             .expect(200)
    //             .end((err, res) => {
    //                 if(err) return done(err);
    //                 else {
    //                     expect().to.equal();
    //                     done();
    //                 }
    //             });
    //     });
    //
    //
    // });
    //
    // describe('El administrador del sistema comprueba los logs...', () => {
    //
    //     // - Comprobar los logs
    //
    //
    //
    //     it('', done => {
    //         request()
    //             .get('/')
    //             .expect('Content-Type', /json/)
    //             .expect(200)
    //             .end((err, res) => {
    //                 if(err) return done(err);
    //                 else {
    //                     expect().to.equal();
    //                     done();
    //                 }
    //             });
    //     });
    //     it('', done => {
    //         request()
    //             .get('/')
    //             .expect('Content-Type', /json/)
    //             .expect(200)
    //             .end((err, res) => {
    //                 if(err) return done(err);
    //                 else {
    //                     expect().to.equal();
    //                     done();
    //                 }
    //             });
    //     });
    //
    //
    // });
    //
    // describe('', () => {
    //
    //
    //
    //     it('', done => {
    //         request()
    //             .get('/')
    //             .expect('Content-Type', /json/)
    //             .expect(200)
    //             .end((err, res) => {
    //                 if(err) return done(err);
    //                 else {
    //                     expect().to.equal();
    //                     done();
    //                 }
    //             });
    //     });
    //     it('', done => {
    //         request()
    //             .get('/')
    //             .expect('Content-Type', /json/)
    //             .expect(200)
    //             .end((err, res) => {
    //                 if(err) return done(err);
    //                 else {
    //                     expect().to.equal();
    //                     done();
    //                 }
    //             });
    //     });
    //
    // });

});
