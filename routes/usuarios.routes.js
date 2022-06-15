const { Router } = require('express');
const { getUsuarios, storeUsuario, updateUsuario, deleteUsuario }  = require('../controllers/Usuarios.controller');
const { check } = require('express-validator')
const { validarCampos } = require('../middlewares/validar-campos')
const {validarJWT} = require('../middlewares/validar-jwt');

const router = Router();

router.get('/', validarJWT, getUsuarios);

router.post('/', [
  check('nombre', 'El nombre es obligatorio').not().isEmpty(),
  check('password', 'La contraseña es obligatoria').not().isEmpty(),
  check('email', 'Email es obligatorio').isEmail(),
  validarCampos
], storeUsuario);

router.put('/:id', [
  validarJWT,
  check('nombre', 'El nombre es obligatorio').not().isEmpty(),
  check('email', 'El email es obligatorio').isEmail(),
  check('role', 'El role es obligatorio').not().isEmpty(),
  validarCampos
], updateUsuario)

router.delete('/:id', validarJWT, deleteUsuario)



module.exports= router