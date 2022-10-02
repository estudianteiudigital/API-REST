  const mongoose = require('mongoose');

// creamos una funcion flecha encargada de realizar la conexion a la base de datos

  const getConnection = async () => {  //funcion asincrona
    try{

        const url = 'mongodb://user_bd:3vRY3czeQEkuyAy9@ac-7uambeg-shard-00-00.nqbc21y.mongodb.net:27017,ac-7uambeg-shard-00-01.nqbc21y.mongodb.net:27017,ac-7uambeg-shard-00-02.nqbc21y.mongodb.net:27017/inventario-app?ssl=true&replicaSet=atlas-34tvq0-shard-0&authSource=admin&retryWrites=true&w=majority';

        await mongoose.connect(url);
    
        console.log('Conexion exitosa');
    } catch(error) {
        console.log(error);
    }

}
module.exports = {
    getConnection,
}