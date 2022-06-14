const express = require('express');
const {dbConnection} = require('./database/config');

const app = express();
//Base de datos
dbConnection();

//Dracka911- gersomsim
// RUTAS
app.get( '/', (req, res) => {
  res.json( {
    ok: true,
    msg: 'Hola mundo'
  } )
});

app.listen( 3000, ()=>{
  console.log( 'servidor corriendo en el puerto ', + 3000);
} )