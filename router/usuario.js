// importaciones 
const { Router } = require('express');
const { validationResult, check } = require('express-validator');
const Usuario = require('../models/Usuario');
const bycrypt = require('bcryptjs');
const { validarJWT } = require('../middlewares/validar-jwt');
const { validarRolAdmin } = require('../middlewares/validar-rol-admin');

// const Usuario = require('../models/Usuario'); //importamos modelo

const router = Router();
// const { validarUsuario } = require('../helpers/validar-usuario');-----------------
//creamos recurso de nuevo usuario
//req, vienen todos los datos que le envie a este recurso
// res, responde a la solicitud que me acaba de llegar

//crear nuevo usuario
router.post('/', [
  check('nombre', 'invalid.nombre').not().isEmpty(),
  check('email', 'invalid.email').isEmail(),
  check('estado', 'invalid.estado').isIn(['Activo', 'Inactivo']),
  check('contrasena', 'invalid.contrasena').not().isEmpty(),
  validarJWT,
  validarRolAdmin,
  check('rol', 'invalid.rol').isIn(['ADMIN', 'DOCENTE']),
], async function (req, res) {
  try {
    console.log(req.body);
    //const validaciones = validarUsuario(req); ------------------------

    //Validacion campos requeridos

    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ mensaj: errors.array() });
    }

    //Validacion email
    const existeEmail = await Usuario.findOne({ email: req.body.email });
    if (existeEmail) {
      return res.status(400).json({ mensaje: 'El email ya existe' });
    }

    let usuario = new Usuario();
    usuario.nombre = req.body.nombre;
    usuario.email = req.body.email;
    usuario.estado = req.body.estado;
    const salt = bycrypt.genSaltSync();
    const contrasena = bycrypt.hashSync(req.body.contrasena, salt); 
    usuario.contrasena = contrasena;
    usuario.rol = req.body.rol;
    usuario.fechaCreacion = new Date();
    usuario.fechaActualizacion = new Date();

    usuario = await usuario.save();

    res.send(usuario);
  } catch (error) {
    console.log(error);
    res.status(500).json({ mensaje: 'Ocurrio un error en el servidor' });
  }

});

//   if(validaciones.length > 0) {
//    return res.status(400).send(validaciones); 
// }

//console.log('Objeto recibido', req.body); // recibir datos en el body
//crear nueva instancia del modelo usuario, se setearon los cada uno de los valores que vienen desde postman

//const existeUsuario = await Usuario.findOne({ email: req.body.email });
// console.log('Respuesta existe usuario', existeUsuario);

//if ( existeUsuario) {
//  return res.status(400).send('Email ya existe');
// }

//let usuario = new Usuario();
//usuario.nombre = req.body.nombre; 
//usuario.email = req.body.email;
//usuario.estado = req.body.estado;
//usuario.fechaCreacion = new Date(); //se tomaron desde de la fecha actual del sistema del servidor
//usuario.fechaActualizacion = new Date();

// usuario = await usuario.save(); //a la variable usuario se le asigna la respuesta de llamar el metodo save a partir de la variable usuario
// res.send(usuario);    //para ver en la respuesta del servicio, lo que se guardo en la linea anterior  


//Listar 
router.get('/', [validarJWT], async function (req, res) {
  try {
    const usuarios = await Usuario.find();
    res.send(usuarios);
  } catch (error) {
    console.log(error);
    res.status(500).send({ mensaje: 'Ocurrio un error' });
  }

});

router.put('/:usuarioId', async function (req, res) {
  try {

    const validaciones = validarUsuario(req);

    if (validaciones.length > 0) {
      return res.status(400).send(validaciones);
    }

    console.log('Objeto recibido', req.body, req.params); // 
    let usuario = await Usuario.findById(req.params.usuarioId);

    if (!usuario) {
      return res.status(400).send('Usuario no existe');
    }
    const existeUsuario = await Usuario
      .findOne({ email: req.body.email, _id: { $ne: usuario._id } });

    console.log('Respuesta existe usuario', existeUsuario);

    if (existeUsuario) {
      return res.status(400).send('Email ya existe');
    }

    usuario.email = req.body.email;
    usuario.nombre = req.body.nombre;
    usuario.estado = req.body.estado;
    usuario.fechaActualizacion = new Date();

    usuario = await usuario.save(); //
    res.send(usuario);

  } catch (error) {
    console.log(error);
    res.status(500).send('Ocurrio un error');
  }
});

router.delete('/:usuarioId', async function (req, res) {
  try {

    console.log('Objeto recibido', req.body, req.params); // 
    let usuario = await Usuario.findById(req.params.usuarioId);

    if (!usuario) {
      return res.status(400).send('Usuario no existe');
    }
    usuario = await usuario.remove(); //
    res.send('Usuario eliminado');
    console.log('Usuario eliminado ', usuario);

  } catch (error) {
    console.log(error);
    res.status(500).send('Ocurrio un error');
  }
});

router.get('/:usuarioId', async function (req, res) {
  try {
    const usuario = await Usuario.findById(req.params.usuarioId);
    if (!usuario) {
      return res.status(404).send('Usuario no existe');
    }
    res.send(usuario);
  } catch (error) {
    console.log(error);
    res.status(500).send('Ocurrio un error al consultar usuario');
  }
});

//router tiene asociada todas las rutas de la APP
module.exports = router;