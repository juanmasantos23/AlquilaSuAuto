const { Schema, model } = require('mongoose');

const vehiculoSchema = Schema({
    propietario: {
        type: Schema.Types.ObjectId,
        ref: 'Usuario',
        required: true 
    },
    marca: { 
        type: String, 
        required: true 

    },
    modelo: { 
        type: String, 
        required: true 
        
    },
    aNOo: { 
        type: Number, 
        required: true 

    },
    matricula: { 
        type: String, 
        required: true, 
        unique: true 
    },
    fotos: [{
        type: String 
    }],
    precio: { 
        type: Number, 
        required: true 
    },
    verificado: { 
        type: Boolean, 
        default: false 

    },
});

module.exports = model('vehiculo', vehiculoSchema);
