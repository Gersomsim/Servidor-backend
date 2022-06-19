const Usuario = require('../models/usuario.model');
const Medico = require('../models/medico.model');
const Hospital = require('../models/hospital.model');

const fs = require('fs');


const actualizarImg = async (tipo, id, nombre) => {
  let path = "";
  switch (tipo) {
    case 'hospitales':
      const hospital = await Usuario.findById(id);
        if (!hospital){
          console.log('no se encontro el medico');
          return false;
        }
        path = `./uploads/hospitales/${hospital.img}`
        borrarImg( path );

        hospital.img = nombre;
        await hospital.save();
        return true;
    case 'medicos':
        const medico = await Medico.findById(id);
        if (!medico){
          console.log('no se encontro el medico');
          return false;
        }
        path = `./uploads/medicos/${medico.img}`
        borrarImg( path );

        medico.img = nombre;
        await medico.save();
        return true;
    case 'usuarios':
      const usuario = await Usuario.findById(id);
        if (!usuario){
          console.log('no se encontro el medico');
          return false;
        }
        path = `./uploads/usuarios/${usuario.img}`
        borrarImg( path );

        usuario.img = nombre;
        await usuario.save();
        return true;
  }


  console.log( 'vamos bien')
}
const borrarImg = (path) => {
  //borramos la imagen anterior
  if ( fs.existsSync( path)){
    fs.unlinkSync(path);
  }
  return true;
}

module.exports = actualizarImg;