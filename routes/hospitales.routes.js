
const Router = require('express');
const { check } = require('express-validator')
const { validarJWT } = require('../middlewares/validar-jwt')
const { validarCampos } = require('../middlewares/validar-campos')

const {getHospitales, getHospital, sotoreHospital, UpdtateHospital, destroyHospital} = require('../controllers/Hospitales.controllers')

const router = Router();

router.get('/', 
      getHospitales);
router.get('/:id',
       getHospital);
router.post('/', 
      [
            validarJWT,
            check('nombre', 'El nombre del hospital es requerido').not().isEmpty(),
            validarCampos
      ],
      sotoreHospital);
router.put('/:id', 
      [],
      UpdtateHospital);
router.delete('/:id', destroyHospital);

module.exports = router