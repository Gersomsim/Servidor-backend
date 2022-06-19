const Hospital = require('../models/hospital.model')

const getHospitales = async (req, res) => {
  const hospitales = await Hospital.find()
                                      .populate('usuario', 'nombre email img');
  res.json({
    ok: true,
    hospitales
  })
}
const getHospital = (req, res) => {
  res.json({
    ok: true,
    msg: 'get Hospital'
  })
}
const sotoreHospital = async (req, res) => {
  const uid = req.uid;
  const hospital = new Hospital( {usuario: uid, ...req.body} );

  try {
    const hosp = await hospital.save();
    res.json({
      ok: true,
      msg: 'store Hospital',
      hospital: hosp
    })

  } catch (error) {
    console.log( error);
    return res.status(500).json({
      ok: false,
      msg: 'Hable con el administrador'
    })
  }

  
}
const UpdtateHospital = (req, res) => {
  res.json({
    ok: true,
    msg: 'update Hospital'
  })
}
const destroyHospital = (req, res) => {
  res.json({
    ok: true,
    msg: 'destroy Hospital'
  })
}

module.exports = { destroyHospital, UpdtateHospital, sotoreHospital, getHospital, getHospitales}