const { Router } = require('express');
const Marca = require('../models/Marca');
const { validarMarca } = require('../helpers/validar-marca');

const router = Router();

router.get('/', async function (req, res) {

    try {
        const marcas = await Marca.find(); 
       res.send(marcas);
       } catch(error){
        console.log(eror); 
        res.status(500).send('Ocurrio un error');
       }
});

router.post('/', async function (req, res){ //crear
  try {
    const validaciones = validarMarca(req);

    if(validaciones.length > 0) {
        return res.status(400).send(validaciones); 
    }

    let marca = new Marca();
    marca.nombre = req.body.nombre; 
    marca.estado = req.body.estado;
    marca.fechaCreacion = new Date(); 
    marca.fechaActualizacion = new Date();
  
    marca = await marca.save(); 
     res.send(marca);    
  
    } catch(error) {
      console.log(error);
      res.status(500).send('Ocurrio un error');
    }
});

router.put('/:marcaId', async function (req, res){   //actualizar
  try {

      const validaciones = validarMarca(req);

      if(validaciones.length > 0) {
          return res.status(400).send(validaciones); 
      }

      let marca = await Marca.findById(req.params.marcaId);
      if(!marca) {
       return res.status(400).send(validaciones);
      }

      marca.nombre = req.body.nombre;
      marca.estado = req.body.estado; 
      marca.fechaActualizacion = new Date();
      marca = await marca.save();
      res.send(marca); 
   
       } catch(error) {
           console.log(error);
           res.status(500).send('Ocurrio un error');
       }
});

router.delete('/:marcaId', async function (req, res) {
  try {

    console.log('Objeto recibido', req.body, req.params); // 
    let marca = await Marca.findById( req.params.marcaId );

    if (!marca) {
     return res.status(400).send('marca no existe');
    }
  marca = await marca.remove(); //
   res.send('Marca eliminada'); 
   console.log('Marca eliminada ', marca);    

  } catch(error) {
    console.log(error);
    res.status(500).send('Ocurrio un error');
  }
});

module.exports = router;
