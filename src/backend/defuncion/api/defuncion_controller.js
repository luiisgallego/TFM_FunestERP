'use strict';

let difuntoControler = require('./difunto_controller');
let servicioControler = require('./servicio_controller');

function status(req, res) {

    // Mostramos status OK
    let data = { "status" : "OK" };
    res.status(200).type('json').send(data);
}

async function read(req, res) {

    const [status_difunto, difunto] = await difuntoControler.read(req);

    // Esperamos confirmacion de que el difunto se ha leido correctamente
    if (status_difunto === 200) {
        // Añadimos el identificador del difunto al request para el servicio
        req.params.difunto = req.params._id;

        const [status_servicio, servicio] = await servicioControler.readByDifuntoId(req);

        if (status_servicio === 200) {
            return res.status(200).type('json').send({
                'difunto': difunto,
                'servicio': servicio
            });
        }
        return res.status(404).type('json').send(servicio);
    }
    return res.status(404).type('json').send(difunto);
}

async function create(req, res) {

    const [status_difunto, difunto] = await difuntoControler.create(req);

    // Esperamos confirmacion de que el difunto se ha creado correctamente
    if (status_difunto === 200) {
        // Añadimos el identificador del difunto al request para el servicio
        req.body.difunto = difunto._id;

        const [status_servicio, servicio] = await servicioControler.create(req);

        if (status_servicio === 200) {
            return res.status(200).type('json').send({
                'difunto': difunto,
                'servicio': servicio
            });
        }

        difunto.remove();
        return res.status(404).type('json').send(servicio);
    }
    return res.status(404).type('json').send(difunto);
}

module.exports = {
    status,
    read,
    create
};
