//importamos mongoose y obtenemos schema y model
const {Schema, model} = require('mongoose');

//declaracaion de atributos de la tabla Marca 
const MarcaSchema = Schema({
    nombre:{
       type: String,
       required: true,
    }, 
    estado:{
       type: String,
       required: true,
       enum: [
        'Activo', 'Inactivo'
    ]
    },
    fechaCreacion:{
       type: Date,
       required: true,
    },
    fechaActualizacion:{
        type: Date,
        required: true,
    }
});

module.exports = model('Marca', MarcaSchema);