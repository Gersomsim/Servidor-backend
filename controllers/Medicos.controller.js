const Medico = require('../models/medico.model');

const index =  async(req, res) =>{
  const medicos = await Medico.find()
                          .populate('hospital', 'nombre')
                          .populate('usuario', 'nombre img')
  res.json({
    ok: true,
    medicos
  });
}

const show = (req, res) => {

  res.json({
    ok: true,
    msg: 'Show del medico'
  })
}

const store = async (req, res) => {
  const uid = req.uid;
  const medico = new Medico({ usuario: uid, ...req.body});
  console.log( medico )
  try {
    const med = await medico.save();
    res.json({
      ok: true,
      medico: med
    });
  } catch (error) {
    console.log( error );
    return res.status(500, {
      ok: false,
      msg: 'Contacte al administrador'
    })
  }

  
}
const update = ( req, res ) => {

  res.json({
    ok: true,
    msg: 'update'
  })
}
const destroy = (req, res) => {

  res.json({
    ok: true,
    msg: 'destroy'
  })
}

module.exports = { destroy, update, store, show, index }