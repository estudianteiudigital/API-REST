const { Router } = require('express');
const { validationResult, check } = require('express-validator');
const bcrypt = require('bcryptjs');
const Usuario = require('../models/Usuario');
const { generarJWT } = require('../helpers/jwt');

const router = Router();

router.post('/', [

    check('email', 'email.requerido').isEmail(),
    check('contrasena', 'contrasena.requerida').not().isEmpty(),

], async function(req, res) {
    try {
        const errors = validationResult(req);  //valida los campos requeridos
        if (!errors.isEmpty()) {
            return res.status(400).json({ mensaje: errors.array() });  
        }

        const usuario = await Usuario.findOne({ email: req.body.email });
        if (!usuario) {  //validacion de usuario por email
            return res.status(400).json({ mensaje: 'Usuario no encontrado' });
        }

        //validacion de la contrasena
        const esIgual = bcrypt.compareSync(req.body.contrasena, usuario.contrasena);
        if (!esIgual) {
            res.status(400).json({ mensaje: 'Usuario no encontrado' });
        }

        //generar token
        const token = generarJWT(usuario);

        res.json({
            _id: usuario._id, nombre: usuario.nombre, email: usuario.email, 
            estado: usuario.estado, rol: usuario.rol, access_token: token
        });

    } catch (error) {
        console.log(error);
        res.status(500).json({ mensaje: 'Error de servidor interno' });
    }

});

module.exports = router;

//module.exports = router;