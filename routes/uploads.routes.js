const Router = require('express');
const { file, getFoto } = require('../controllers/Uploads.controller');
const { validarJWT } = require('../middlewares/validar-jwt');
const expressFileUpload = require('express-fileupload');


const router = Router();

router.use(expressFileUpload())

router.put('/:tipo/:id', validarJWT, file)
router.get('/:tipo/:img', getFoto)

module.exports = router;