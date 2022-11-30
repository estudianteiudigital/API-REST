const validarUsuario = (req) => {
    const validaciones = [];
  //validacion de cada una de las propiedades
  if(!req.body.nombre) {
   validaciones.push('Nombre es requerido');
  }
  if(!req.body.email) {
      validaciones.push('Email es requerido');
     }
     if(!req.body.estado) {
      validaciones.push('Estado es requerido');
     }
    if(!req.body.contrasena) {
      validaciones.push('Contrasena es requerida');
     }
    if(!req.body.rol) {
      validaciones.push('Rol es requerido');
     }
     
  return validaciones;
  }
  
  module.exports = {
  validarUsuario,
 }