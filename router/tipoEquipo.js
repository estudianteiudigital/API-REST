const { Router } = require('express');
const TipoEquipo = require('../models/TipoEquipo'); 
const { validarTipoEquipo } = require('../helpers/validar-tipoEquipo');

const router = Router();


router.get('/', async function (req, res){ //listar 
    try {
   const tipos = await TipoEquipo.find();
   res.send(tipos);

    } catch(error) {
        console.log(error); 
        res.status(500).send('Ocurrio un error');
    }
});

router.post('/', async function (req, res){ //crear
    try {
        const validaciones = validarTipoEquipo(req);

    if(validaciones.length > 0) {
        return res.status(400).send(validaciones); 
    }

   let tipoEquipo = new TipoEquipo();
   tipoEquipo.nombre = req.body.nombre;
   tipoEquipo.estado = req.body.estado; 
   tipoEquipo.fechaCreacion = new Date();
   tipoEquipo.fechaActualizacion = new Date();
   tipoEquipo = await tipoEquipo.save();
   res.send(tipoEquipo); 

    } catch(error) {
        console.log(error);
        res.status(500).send('Ocurrio un error');
    }
});

router.put('/:tipoEquipoId', async function (req, res){   //actualizar
    try {

        const validaciones = validarTipoEquipo(req);

        if(validaciones.length > 0) {
            return res.status(400).send(validaciones); 
        }

        let tipoEquipo = await TipoEquipo.findById(req.params.tipoEquipoId);
        tipoEquipo.nombre = req.body.nombre;
        tipoEquipo.estado = req.body.estado; 
        tipoEquipo.fechaActualizacion = new Date();
        tipoEquipo = await tipoEquipo.save();
        res.send(tipoEquipo); 
     
         } catch(error) {
             console.log(error);
             res.status(500).send('Ocurrio un error');
         }
});

router.delete('/:tipoEquipoId', async function (req, res) {
    try {
  
      console.log('Objeto recibido', req.body, req.params); // 
      let tipoEquipo = await TipoEquipo.findById( req.params.tipoEquipoId );
  
      if (!tipoEquipo) {
       return res.status(400).send('Tipo equipo no existe');
      }
    tipoEquipo = await tipoEquipo.remove(); //
     res.send('Tipo equipo eliminado'); 
     console.log('Tipo equipo eliminado ', tipoEquipo);    
  
    } catch(error) {
      console.log(error);
      res.status(500).send('Ocurrio un error');
    }
  });

module.exports = router;