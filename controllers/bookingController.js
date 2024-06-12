const { response } = require('express');
const Reserva = require('../models/reserva');

const reservarVehiculo = async (req, res = response) => {
    const reserva = new Reserva({ usuario: req.uid, ...req.body });

    try {
        const reservaDB = await reserva.save();
        res.json({ ok: true, reserva: reservaDB });
    } catch (error) {
        console.log(error);
        res.status(500).json({ ok: false, msg: 'Error inesperado... revisar logs' });
    }
}

const getReservas = async (req, res) => {
    const reservas = await Reserva.find().populate('usuario', 'nombre email').populate('vehiculo', 'marca modelo');
    res.json({ ok: true, reservas });
}

const confirmarReserva = async (req, res = response) => {
    const uid = req.params.id;

    try {
        const reservaDB = await Reserva.findById(uid);
        if (!reservaDB) {
            return res.status(404).json({ ok: false, msg: 'No existe una reserva por ese id' });
        }

        reservaDB.estado = 'aceptada';
        await reservaDB.save();

        res.json({ ok: true, reserva: reservaDB });
    } catch (error) {
        console.log(error);
        res.status(500).json({ ok: false, msg: 'Error inesperado... revisar logs' });
    }
}

module.exports = { reservarVehiculo, getReservas, confirmarReserva };
