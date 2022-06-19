const Hospital = require("../models/hospital.model");
const Medico = require("../models/medico.model");
const Usuario = require("../models/usuario.model");



const busqueda = async (req, res) => {
  const busqueda = req.params.search;
  const regext = new RegExp(busqueda, 'i')

  const [ usuarios, hospitales, medicos] = await Promise.all([
      Usuario.find({  nombre: regext }),
      Hospital.find({ nombre: regext }),
      Medico.find({  nombre: regext })
  ]);

  try {
    res.json({
      ok: true,
      msg: 'buscando',
      usuarios,
      hospitales,
      medicos,
      busqueda
    })
  } catch (error) {
    console.log(error);
    res.status(500).json({
      ok: false,
      msg: 'Contacte al administrador'
    })
  }
  
}

const getDocCollect = async ( req, res ) => {
  const busqueda = req.params.search;
  const collection = req.params.collection;
  const regext = new RegExp(busqueda, 'i')
  let data;

  switch (collection) {
    case 'hospitales':
      data = await Hospital.find({ nombre: regext })
                            .populate('usuario', 'nombre email img');
      break;
    case 'medicos':
      data = await Medico.find({  nombre: regext })
                          .populate('usuario', 'nombre email img')
                          .populate('hospital', 'nombre')
      break;
    case 'usuarios':
      data = await Usuario.find({  nombre: regext });
      break;
    default:
      return res.status(400).json({
        ok: false,
        msg: 'collecion incorrecta'
      })
      break;
  }

  try {
    res.json({
      ok: true,
      msg: 'buscando',
      collection: collection,
      resultados: data
    })
  } catch (error) {
    console.log(error);
    res.status(500).json({
      ok: false,
      msg: 'Contacte al administrador'
    })
  }
}

module.exports = { busqueda, getDocCollect }