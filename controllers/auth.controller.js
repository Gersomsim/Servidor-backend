const { response } = require('express');
const Usuario = require('../models/usuario.model')
const bcript = require('bcryptjs')
const {generarJWT} = require('../helpers/jwt')

const login = async (req, res ) => {
  const {email, password} = req.body;
  try {
    // Verificar email
    const userDB = await Usuario.findOne({email})
    if ( !userDB ){
      return res.status(404).json({
        ok: false,
        msg: 'Email no encontrado'
      });
    }

    // verificar contraseña

    const ValidPass = bcript.compareSync( password, userDB.password );
    if (!ValidPass){
      return res.status(400).json({
        ok: false,
        msg: 'Password incorrecto'
      });
    }
    //Generar el token
    const token = await generarJWT( userDB.id )
    res.json({
      ok: true,
      msg: 'algo',
      token
    })
  } catch (error) {
    console.log ( error );
    return res.status(500).json({
      ok: false,
      msg: 'Error inesperado... revisar logs'
    })
  }
  
}


module.exports = { login };