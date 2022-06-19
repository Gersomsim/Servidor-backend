const Router = require('express');
const { busqueda, getDocCollect } = require('../controllers/Busqueda.controller');
const { validarJWT } = require('../middlewares/validar-jwt');

const router = Router();

router.get('/:search',  validarJWT, busqueda);
router.get('/coleccion/:collection/:search', validarJWT, getDocCollect);


module.exports = router;