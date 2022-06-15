const Usuario = require('../models/usuario.model')

const getUsuarios = (req, res )=>{
  res.json({
    ok: true,
    msg: 'Get Usuarios',
    usuarios: []
  })
}

const storeUsuario = async (req, res ) => {
  const { email, password, nombre } = req.body;
  
  const usuario = new Usuario(req.body);

  await usuario.save();

  res.json({
    ok: true,
    msg: 'Usuario creado',
    usuario
  })
}


module.exports = { getUsuarios, storeUsuario }