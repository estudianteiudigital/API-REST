const { Schema, model } = require('mongoose');

//creamos esquema 

const   UsuarioSchema = Schema({   //propiedades qde la tabla Usuario

    nombre:{
      type: String,
      required: true,  //similar a not null
    },
    email:{
        type: String,
        required: true,
        unique: true,  //

    },
    estado:{
        type: String,
        required: true,
        enum: [
         'Activo',
         'Inactivo'
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

module.exports = model('Usuario', UsuarioSchema);