const jwt = require("jsonwebtoken");


const verificarToken = (req, res, next) => {
  const token = req.header("Authorization");
  if (!token) return res.status(401).json({ error: "Acceso denegado" });

  try {
    const verificado = jwt.verify(token, process.env.JWT_SECRET);
    req.usuario = verificado;
    next();
  } catch (error) {
    res.status(400).json({ error: "Token inválido" });
  }
};


module.exports = verificarToken;
