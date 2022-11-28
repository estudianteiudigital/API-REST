const { Schema, model } = require('mongoose');

//creamos esquema 

const   UsuarioSchema = Schema({   //propiedades del modelo Usuario

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
    contrasena: {
      type: String,
      required: true,
    },
    rol: {
      type: String,
      required : true,
      enum: [
        'ADMIN',
        'DOCENTE'
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