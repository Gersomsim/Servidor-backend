const { Router } = require('express');
const { getUsuarios, storeUsuario }  = require('../controllers/Usuarios.controller')

const router = Router();

router.get('/', getUsuarios);
router.post('/', storeUsuario);

module.exports= router