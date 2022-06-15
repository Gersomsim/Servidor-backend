const Usuario = require('../models/usuario.model')
const { response } = require('express');
const bcrypt = require('bcryptjs');
const { generarJWT } = require('../helpers/jwt');

const getUsuarios = async(req, res )=>{
  
  const usuarios = await Usuario.find({}, 'nombre email role google')

  res.json({
    ok: true,
    msg: 'Get Usuarios',
    usuarios,
    uid: req.uid
  })
}

const storeUsuario = async (req, res = response ) => {
  const { email, password } = req.body;

  try {
    //Verificamos que no exista el mismo email
    const existeEmail = await Usuario.findOne({ email });
    if( existeEmail ) {
      return res.status(400).json({
        ok: false,
        msg: 'El email ya esta registrado',
      })
    }

    const usuario = new Usuario(req.body);

    // encriptar contraseña
    const salt = bcrypt.genSaltSync();
    usuario.password = bcrypt.hashSync( password, salt);
    // Guardar usuario
    await usuario.save();
    const token = await generarJWT(usuario.id);
  
    res.json({
      ok: true,
      msg: 'Usuario creado',
      usuario, 
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

// TODO validar token t ver si es el usuario correcto
const updateUsuario = async ( req, res = response) => {
  const uid = req.params.id;
  
  try {
    const usuarioDB = await Usuario.findById(uid);
    if( !usuarioDB ) {
      return res.status(404).json({
        ok: false,
        msg: 'El no existe el usuario con ese uid',
      });
    }

    const {password, google, email, ...campos} = req.body;
    
    if ( email !== usuarioDB.email ){
      const existeEmail = await Usuario.findOne({ email });
      if (existeEmail){
        return res.status(400).json({
          ok: false,
          msg: 'El email ya existe',
        });
      }
      campos.email = email;
    }
    const usuarioActualizado = await Usuario.findByIdAndUpdate(uid, campos, {new: true});

    res.json({
      ok: true,
      uid,
      usuario: usuarioActualizado
    })

  } catch (error) {
    console.log( error);
    return res.status(500).json({
      ok: false,
      msg: 'Error inesperado... revisar logs'
    })
  }
}

const deleteUsuario = async ( req, res = response) => {
  const uid = req.params.id;
  try {
    const userDB = await Usuario.findById(uid);
    if ( !userDB ){
      return res.status(400).json({
        ok: false,
        msg: 'No existe el usuario con ese id',
      });
    }
    await Usuario.findByIdAndDelete(uid);
    res.json({
      ok: true,
      msg: 'Usuario eliminado'
    })
    
  } catch (error) {
    console.log( error);
    return res.status(500).json({
      ok: false,
      msg: 'Error inesperado... revisar logs'
    })
  }
}


module.exports = { getUsuarios, storeUsuario, updateUsuario, deleteUsuario}