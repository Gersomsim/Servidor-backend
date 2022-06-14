require('dotenv').config();
const express = require('express');
const {dbConnection} = require('./database/config');

const app = express();

//Base de datos
dbConnection();


// RUTAS
app.get( '/', (req, res) => {
  res.json( {
    ok: true,
    msg: 'Hola mundo'
  } )
}); 

app.listen( process.env.PORT, ()=>{
  console.log( 'servidor corriendo en el puerto ', + process.env.PORT);
} )