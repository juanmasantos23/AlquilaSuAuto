const { Router } = require('express');
const { check } = require('express-validator');
const { reservarVehiculo, getReservas, confirmarReserva } = require('../controllers/bookingController');
const { validarJWT } = require('../middlewares/validar-jwt');
const { validarCampos } = require('../middlewares/validar-campos');

const router = Router();

router.post('/', [
    validarJWT,
    check('vehiculo', 'El vehículo es obligatorio').isMongoId(),
    check('fechaInicio', 'La fecha de inicio es obligatoria').isDate(),
    check('fechaFin', 'La fecha de fin es obligatoria').isDate(),
    validarCampos,
], reservarVehiculo);

router.get('/', validarJWT, getReservas);

router.put('/:id/confirmar', validarJWT, confirmarReserva);

module.exports = router;
