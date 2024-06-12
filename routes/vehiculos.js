const { Router } = require('express');
const { check } = require('express-validator');
const { registrarVehiculo, getVehiculos, verificarVehiculo } = require('../controllers/vehicleController');
const { validarJWT } = require('../middlewares/validar-jwt');
const { validarCampos } = require('../middlewares/validar-campos');

const router = Router();

router.post('/', [
    validarJWT,
    check('marca', 'La marca es obligatoria').not().isEmpty(),
    check('modelo', 'El modelo es obligatorio').not().isEmpty(),
    check('año', 'El año es obligatorio').isNumeric(),
    check('matricula', 'La matrícula es obligatoria').not().isEmpty(),
    check('precio', 'El precio es obligatorio').isNumeric(),
    validarCampos,
], registrarVehiculo);

router.get('/', getVehiculos);

router.put('/:id/verificar', validarJWT, verificarVehiculo);

module.exports = router;
