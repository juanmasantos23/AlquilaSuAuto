const { Schema, model } = require('mongoose');

const reservaSchema = Schema({
    usuario: { 
        type: Schema.Types.ObjectId, 
        ref: 'Usuario', required: true 

    },
    vehiculo: { 
        type: Schema.Types.ObjectId, 
        ref: 'Vehiculo', required: true 

    },
    fechaInicio: { 
        type: Date, 
        required: true 

    },
    fechaFin: { 
        type: Date, 
        required: true 

    },
    estado: { 
        type: String, 
        enum: ['pendiente', 'aceptada', 'rechazada'], default: 'pendiente' 

    },
});

module.exports = model('reserva', reservaSchema);
