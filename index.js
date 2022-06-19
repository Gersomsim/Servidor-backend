require('dotenv').config();
const express = require('express');
const {dbConnection} = require('./database/config');
var bodyParser = require('body-parser')
const cors = require('cors');

const app = express();

//Configurar CORS
app.use( cors() );

// Lectura y parse del body
app.use( bodyParser.urlencoded() );

//Base de datos
dbConnection();

app.use('/api/usuarios', require('./routes/usuarios.routes'));
app.use('/api/hospitales', require('./routes/hospitales.routes'));
app.use('/api/medicos', require('./routes/medicos.routes'));
app.use('/api/login', require('./routes/login.routes'));
app.use('/api/todo', require('./routes/busquedas.routes'));
app.use('/api/uploads', require('./routes/uploads.routes'));
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