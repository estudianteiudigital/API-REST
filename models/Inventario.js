const {Schema, model} = require('mongoose');
const EstadoEquipo = require('./EstadoEquipo');

const InventarioSchema = Schema({  //atributos de la tabla 
    serial: {
        type: String,
        required: true,
        unique: true,
    },
    modelo: {
        type: String,
        required: true,
    },
    descripcion: {
        type: String,
        required: true,
    },
    color: {
        type: String,
        required: true,
    },
    foto: {
        type: String,
        required: true,
    },
    fechaCompra: {
        type: String,
        required: true,
    },
    precio: {
        type: Number,
        required: true,
    },
    usuario: {
      type: Schema.Types.ObjectId,
      ref: 'Usuario',
      required: false, //valor false porque en un inicio no es requerido, posrteriormente se le asignara un usuario, pero al principio no es requierido
    },
    marca: {
        type: Schema.Types.ObjectId, //asociamos la PK de la tabla marcas
        ref: 'Marca',
        required: true,
    },
    tipoEquipo: {
        type: Schema.Types.ObjectId,
        ref: 'TipoEquipo',
        required: true,
    },
    estadoEquipo: {
        type: Schema.Types.ObjectId,
        ref: 'EstadoEquipo',
        required: true,
    },
    fechaCreacion: {
        type: Date,
        required: true,
    },
    fechaActualizacion: {
        type: Date,
        required: true,
    }

});

module.exports = model('Inventario', InventarioSchema);
