const { Router } = require('express');
const { check } = require('express-validator');

const { validarCampos } = require('../middlewares/validar-campos');
const { validarJWT } = require('../middlewares/validar-jwt');

const { index, show, store, update, destroy} = require('../controllers/Medicos.controller')

const router = Router();

router.get('/', index)
router.get('/', show)
router.post('/', [
  validarJWT,
  check('nombre', 'el nombre del medico es obligatorio').not().isEmpty(),
  check('hospital', 'El hospital id debe de ser valido').isMongoId(),
  validarCampos,
], store)
router.put('/', [], update)
router.delete('/', destroy)


module.exports = router;