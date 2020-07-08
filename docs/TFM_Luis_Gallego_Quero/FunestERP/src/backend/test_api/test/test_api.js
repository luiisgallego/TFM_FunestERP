'use strict';

let request = require('supertest'),
    expect = require('chai').expect,
    moment = require('moment');

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

let difunto_servicio = {
    nombre: 'nombre',
    DNI: '77889922P',
    sexo: 'Hombre',
    poblacion: 'poblacion',
    estadoCivil: 'soltero',
    fechaDefuncion: moment("2020-01-01").format(),
    fechaEntierro: moment("2020-01-02").format(),
    tanatorio: 'sala1',
    tipoServicio: 'particular',
    incineracion: false
};

let cliente = new clienteModel({
    nombre: 'cliente_nombre',
    DNI: '77889922P',
    poblacion: 'poblacion_cliente',
    provincia: 'provincia_test',
    telefono: '999885566',
    email: 'correo@correo.com',
    cuentaBancaria: 'ES0011112222334444444444'
});

let familia = new familiaModel({
    arbol: [
        {
            rol: 'Hermanos',
            values: ['Benito', 'Manuel']
        },
        {
            rol: 'Primos',
            values: ['Antonio', 'Jose']
        }
    ]
});


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

    describe('El usuario trabaja con las defunciones...', () => {

        it('Debe crear una nueva defuncion', done => {
            difunto_servicio.createdBy = user._id;

            request(app_defuncion)
                .post('/defuncion')
                .send(difunto_servicio)
                .expect('Content-Type', /json/)
                .expect(200)
                .end((err, res) => {
                    if(err) return done(err);
                    else {
                        let result = res.body;
                        expect(result.difunto).ownProperty('_id');
                        expect(result.difunto.DNI).to.equal(difunto_servicio.DNI);
                        expect(result.difunto.nombre).to.equal(difunto_servicio.nombre);
                        expect(result.difunto.sexo).to.equal(difunto_servicio.sexo);
                        expect(result.difunto.createdBy).to.equal(difunto_servicio.createdBy);
                        expect(result.servicio).ownProperty('_id');
                        expect(result.servicio.fechaDefuncion).to.equal(difunto_servicio.fechaDefuncion);
                        expect(result.servicio.fechaEntierro).to.equal(difunto_servicio.fechaEntierro);
                        expect(result.servicio.createdBy).to.equal(difunto_servicio.createdBy);

                        difunto_servicio._id = result.difunto._id;
                        done();
                    }
                });
        });

        it('Debe poder recibir la información de una defunción concreta', done => {
            request(app_defuncion)
                .get('/defuncion/' + difunto_servicio._id)
                .expect('Content-Type', /json/)
                .expect(200)
                .end((err, res) => {
                    if(err) return done(err);
                    else {
                        let result = res.body;
                        expect(result.difunto._id).to.equal(difunto_servicio._id);
                        expect(result.difunto.DNI).to.equal(difunto_servicio.DNI);
                        expect(result.servicio).ownProperty('_id');
                        expect(result.servicio.fechaDefuncion).to.equal(difunto_servicio.fechaDefuncion);
                        done();
                    }
                });
        });

        it('Debe listar los difuntos', done => {
            request(app_defuncion)
                .get('/defuncion/difunto/list')
                .expect('Content-Type', /json/)
                .expect(200)
                .end((err, res) => {
                    if(err) return done(err);
                    else {
                        let result = res.body;
                        expect(result.length).to.equal(1);
                        expect(result[0]._id).to.equal(difunto_servicio._id);
                        expect(result[0].nombre).to.equal(difunto_servicio.nombre);
                        expect(result[0].DNI).to.equal(difunto_servicio.DNI);
                        done();
                    }
                });
        });

        it('Debe devolver las defunciones sin clientes asociados', done => {
            request(app_defuncion)
                .get('/defuncion/difunto/cliente')
                .expect('Content-Type', /json/)
                .expect(200)
                .end((err, res) => {
                    if(err) return done(err);
                    else {
                        let result = res.body;
                        expect(result.length).to.equal(1);
                        expect(result[0]._id).to.equal(difunto_servicio._id);
                        done();
                    }
                });
        });

        it('Debe devolver las defunciones sin familiares asociados', done => {
            request(app_defuncion)
                .get('/defuncion/difunto/familia')
                .expect('Content-Type', /json/)
                .expect(200)
                .end((err, res) => {
                    if(err) return done(err);
                    else {
                        let result = res.body;
                        expect(result.length).to.equal(1);
                        expect(result[0]._id).to.equal(difunto_servicio._id);
                        done();
                    }
                });
        });
    });

    describe('El usuario trabaja con los clientes...', () => {

        it('Debe crear un nuevo cliente', done => {
            cliente.createdBy = user._id;

            request(app_cliente)
                .post('/cliente')
                .send(cliente)
                .expect('Content-Type', /json/)
                .expect(200)
                .end((err, res) => {
                    if (err) return done(err);
                    else {
                        let result = res.body;
                        expect(result).ownProperty('_id');
                        expect(result.nombre).to.equal(cliente.nombre);
                        expect(result.DNI).to.equal(cliente.DNI);
                        expect(result.poblacion).to.equal(cliente.poblacion);
                        expect(result.provincia).to.equal(cliente.provincia);
                        expect(result.telefono).to.equal(cliente.telefono);
                        expect(result.email).to.equal(cliente.email);
                        expect(result.cuentaBancaria).to.equal(cliente.cuentaBancaria);

                        cliente._id = result._id;
                        done();
                    }
                });
        });

        it('Debe indicar que hay defunciones sin cliente', done => {
            request(app_defuncion)
                .get('/defuncion/difunto/cliente')
                .expect('Content-Type', /json/)
                .expect(200)
                .end((err, res) => {
                    if(err) return done(err);
                    else {
                        let result = res.body;
                        expect(result.length).to.equal(1);
                        done();
                    }
                });
        });

        it('Asignamos cliente a defuncion', done => {
            request(app_cliente)
                .post('/cliente/difunto')
                .send({
                    _id: cliente._id,
                    difunto_id: difunto_servicio._id
                })
                .expect('Content-Type', /json/)
                .expect(200)
                .end((err, res) => {
                    if(err) return done(err);
                    else {
                        let result = res.body;
                        expect(result._id.toString()).to.equal(cliente._id.toString());
                        expect(result.difunto[0].toString()).to.equal(difunto_servicio._id.toString());
                        done();
                    }
                });
        });

        it('Debe indicar que no hay defunciones sin cliente', done => {
            request(app_defuncion)
                .get('/defuncion/difunto/cliente')
                .expect('Content-Type', /json/)
                .expect(200)
                .end((err, res) => {
                    if(err) return done(err);
                    else {
                        let result = res.body;
                        expect(result.length).to.equal(0);
                        done();
                    }
                });
        });

        it('Comprobamos que la defunción se ha actualizado correctamente', done => {
            request(app_defuncion)
                .get('/defuncion/' + difunto_servicio._id)
                .expect('Content-Type', /json/)
                .expect(200)
                .end((err, res) => {
                    if(err) return done(err);
                    else {
                        let result = res.body;
                        expect(result.difunto._id.toString()).to.equal(difunto_servicio._id.toString());
                        expect(result.difunto.cliente.toString()).to.equal(cliente._id.toString());
                        done();
                    }
                });
        });

        it('Eliminamos cliente a defuncion', done => {
            request(app_cliente)
                .delete('/cliente/destroy_difunto/' + cliente._id + '/' + difunto_servicio._id)
                .expect('Content-Type', /json/)
                .expect(200)
                .end((err, res) => {
                    if(err) return done(err);
                    else {
                        let result = res.body;
                        expect(result._id.toString()).to.equal(cliente._id.toString());
                        expect(result.difunto.length).to.equal(0);
                        done();
                    }
                });
        });

        it('Comprobamos que la defunción no tiene el cliente', done => {
            request(app_defuncion)
                .get('/defuncion/' + difunto_servicio._id)
                .expect('Content-Type', /json/)
                .expect(200)
                .end((err, res) => {
                    if(err) return done(err);
                    else {
                        let result = res.body;
                        expect(result.difunto._id.toString()).to.equal(difunto_servicio._id.toString());
                        expect(result.difunto.cliente).to.equal(null);
                        done();
                    }
                });
        });
    });

    describe('El usuario trabaja con los familiares...', () => {

        it('Debe indicar que hay defunciones sin familia', done => {
            request(app_defuncion)
                .get('/defuncion/difunto/familia')
                .expect('Content-Type', /json/)
                .expect(200)
                .end((err, res) => {
                    if(err) return done(err);
                    else {
                        let result = res.body;
                        expect(result.length).to.equal(1);
                        done();
                    }
                });
        });

        it('Debe crear un nueva familia', done => {

            familia.difunto = difunto_servicio._id;
            familia.createdBy = user._id;

            request(app_familia)
                .post('/familia')
                .send(familia)
                .expect('Content-Type', /json/)
                .expect(200)
                .end((err, res) => {
                    if (err) return done(err);
                    else {
                        let result = res.body;
                        expect(result).ownProperty('_id');
                        expect(result).ownProperty('arbol');
                        expect(result.difunto).to.equal(difunto_servicio._id);
                        expect(result.createdBy).to.equal(user._id);

                        familia._id = result._id;
                        done();
                    }
                });
        });

        it('Debe indicar que no hay defunciones sin familia', done => {
            request(app_defuncion)
                .get('/defuncion/difunto/familia')
                .expect('Content-Type', /json/)
                .expect(200)
                .end((err, res) => {
                    if(err) return done(err);
                    else {
                        let result = res.body;
                        expect(result.length).to.equal(0);
                        done();
                    }
                });
        });

        it('Comprobamos que la defunción tiene la familia asignada', done => {
            request(app_defuncion)
                .get('/defuncion/' + difunto_servicio._id)
                .expect('Content-Type', /json/)
                .expect(200)
                .end((err, res) => {
                    if(err) return done(err);
                    else {
                        let result = res.body;
                        expect(result.difunto._id.toString()).to.equal(difunto_servicio._id.toString());
                        expect(result.difunto.familia.toString()).to.equal(familia._id.toString());
                        done();
                    }
                });
        });
    });

    describe('El usuario elimina una defuncion...', () => {

        it('Asignamos cliente a defuncion', done => {
            request(app_cliente)
                .post('/cliente/difunto')
                .send({
                    _id: cliente._id,
                    difunto_id: difunto_servicio._id
                })
                .expect('Content-Type', /json/)
                .expect(200)
                .end((err, res) => {
                    if(err) return done(err);
                    else {
                        let result = res.body;
                        expect(result._id.toString()).to.equal(cliente._id.toString());
                        expect(result.difunto[0].toString()).to.equal(difunto_servicio._id.toString());
                        done();
                    }
                });
        });

        it('Comprobamos que la defunción tiene familia y cliente', done => {
            request(app_defuncion)
                .get('/defuncion/' + difunto_servicio._id)
                .expect('Content-Type', /json/)
                .expect(200)
                .end((err, res) => {
                    if(err) return done(err);
                    else {
                        let result = res.body;
                        expect(result.difunto._id.toString()).to.equal(difunto_servicio._id.toString());
                        expect(result.difunto.familia.toString()).to.equal(familia._id.toString());
                        expect(result.difunto.cliente.toString()).to.equal(cliente._id.toString());
                        done();
                    }
                });
        });

        it('Debe eliminar un difunto', done => {
            request(app_defuncion)
                .delete('/defuncion/difunto/' + difunto_servicio._id)
                .expect('Content-Type', /json/)
                .expect(200)
                .end((err, res) => {
                    if(err) return done(err);
                    else {
                        let result = res.body;
                        expect(result.familia).to.be.empty;
                        expect(result.servicio).to.be.empty;
                        expect(result.cliente.difunto).to.be.empty;
                        done();
                    }
                });
        });
    });

    describe('El administrador del sistema comprueba los logs...', () => {

        it('Debe devolver los logs de defuncion', done => {
            request(app_log)
                .get('/log/0')  // DEFUNCION
                .expect('Content-Type', /json/)
                .expect(200)
                .end((err, res) => {
                    if(err) return done(err);
                    else {
                        let result = res.body;
                        expect(result.length).to.greaterThan(0);
                        done();
                    }
                });
        });

        it('Debe devolver los logs de cliente', done => {
            request(app_log)
                .get('/log/1')  // CLIENTE
                .expect('Content-Type', /json/)
                .expect(200)
                .end((err, res) => {
                    if(err) return done(err);
                    else {
                        let result = res.body;
                        expect(result.length).to.greaterThan(0);
                        done();
                    }
                });
        });

        it('Debe devolver los logs de familia', done => {
            request(app_log)
                .get('/log/2')  // FAMILIA
                .expect('Content-Type', /json/)
                .expect(200)
                .end((err, res) => {
                    if(err) return done(err);
                    else {
                        let result = res.body;
                        expect(result.length).to.greaterThan(0);
                        done();
                    }
                });
        });
    });

});
