const { response } = require('express');
const Vehiculo = require('../models/vehiculo');

const registrarVehiculo = async (req, res = response) => {
    const vehiculo = new Vehiculo({ propietario: req.uid, ...req.body });

    try {
        const vehiculoDB = await vehiculo.save();
        res.json({ ok: true, vehiculo: vehiculoDB });
    } catch (error) {
        console.log(error);
        res.status(500).json({ ok: false, msg: 'Error inesperado... revisar logs' });
    }
}

const getVehiculos = async (req, res) => {
    const vehiculos = await Vehiculo.find().populate('propietario', 'nombre email');
    res.json({ ok: true, vehiculos });
}

const verificarVehiculo = async (req, res = response) => {
    const uid = req.params.id;

    try {
        const vehiculoDB = await Vehiculo.findById(uid);
        if (!vehiculoDB) {
            return res.status(404).json({ ok: false, msg: 'No existe un vehículo por ese id' });
        }

        vehiculoDB.verificado = true;
        await vehiculoDB.save();

        res.json({ ok: true, vehiculo: vehiculoDB });
    } catch (error) {
        console.log(error);
        res.status(500).json({ ok: false, msg: 'Error inesperado... revisar logs' });
    }
}

module.exports = { registrarVehiculo, getVehiculos, verificarVehiculo };
