const express = require('express'); 
//importamos la funcion getConnection, que lo que hace es conectarse a la base de datos 
const { getConnection } = require('./db/db-connection-mongo'); 
//require('dotenv').config(); //con esta podemos utilizar variables de entorno
const cors = require('cors'); 
const UsuarioRoute = require('./router/usuario');
const AuthRoute = require('./router/auth');

 
//const port = process.env.PORT;
 
//llamando conexion bd
getConnection(); 

const app = express();

//middleware cors
app.use(cors()); 

//middleware json
app.use(express.json());

//rutas
app.use('/usuario', UsuarioRoute);
// app.use('/login', AuthRoute);
app.use('/login', AuthRoute);

  app.use('/usuario', require('./router/usuario'));
  app.use('/estado-equipo', require('./router/estadoEquipo'));
  app.use('/marca', require('./router/marca'));
  app.use('/tipo-equipo', require('./router/tipoEquipo'));
  app.use('/inventario', require('./router/inventario'));

  app.listen(4000, () => {
    console.log('Servidor iniciado');
    //console.log(`Example app listening on port ${port}`)
});

 
