const { v4: uuidv4 } = require('uuid');
const fs = require('fs');
const path = require('path')
const actualizarImg = require('../helpers/actualizar-imagen');


const file = async ( req, res ) => {
  const tipo = req.params.tipo;
  const id = req.params.id;

  const tiposValidos = ['hospitales', 'medicos', 'usuarios'];
  if ( !tiposValidos.includes(tipo) ){
    return res.status(400).json({
      ok: false,
      msg: 'no hay un tipo valido'
    });

  }
  // Validamos qu exista un archivo
  if (!req.files || Object.keys(req.files).length === 0) {
    return res.status(400).json({
      ok: false,
      msg: 'No hay ningun archivo'
    });
  }
  //procesar imagen 
  const file = req.files.imagen;

  //extencion 
  const nombreCortado = file.name.split('.');
  const extencion = nombreCortado[nombreCortado.length -1];

  const extencionesValidas = ['png', 'jpg', 'jpeg', 'gif'];
  // Validamos que tenga una extencion valida
  if ( !extencionesValidas.includes( extencion ) ){
    return res.status(400).json({
      ok: false,
      msg: 'el archivo no es de una extecion valida'
    });
  }
  
  //generar nombre del archivo
  const nombreArchivo = `${uuidv4()}.${extencion}`
  //path
  const path = `./uploads/${tipo}/${nombreArchivo}`;
  // Mover Imagen 
  file.mv(path, function(err) {
    if (err){
      return res.status(500).json({
        ok: false,
        msg: 'No se pudo mover, consulte al administrador'
      });
    }

    //Actualizar base de datos
    actualizarImg(tipo, id, nombreArchivo);
    
      res.json({
        ok: true,
        msg: 'Archivo subido',
        nombreArchivo,
      })
  });
}

const getFoto = async (req, res ) => {
  const tipo = req.params.tipo;
  const foto = req.params.img;
  const pathImg = path.join(__dirname, `../uploads/${tipo}/${foto}`)
  if ( !fs.existsSync( pathImg )){
    const imgDefault = path.join(__dirname, `../uploads/no-img.jpg`);
    res.sendFile(imgDefault);
  }else{
    res.sendFile(pathImg);
  }
}

module.exports = { file, getFoto }