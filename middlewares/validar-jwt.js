const jwt = require('jsonwebtoken');

const validarJWT = (req, res, netx) =>{
  const token = req.header('x-token')
  if ( !token ){
    return res.status(401).json({
      ok: false,
      msj:  'No hay token en la peticion'
    });
  }
  try {
    
    const {uid} = jwt.verify( token, process.env.JWT_SECRET);

    req.uid = uid;
    netx();
  } catch (error) {
    return res.status(500).json({
      ok: false,
      msj:  'Token no valido'
    });
  }
}


module.exports = {validarJWT}