const jwt = require("jsonwebtoken");
const jwtDecode = require("jwt-decode");

// Para configurar el tiempo que la sesión estara activa
const isExpired = (token) => {
  const { exp } = jwtDecode(token);
  const expire = exp * 1000;
  const timeout = expire - Date.now();

  return timeout < 0;
};

// Para validar el token de inicio de sesión
const verifyToken = (req, res, next) => {
  const { authorization } = req.headers;

  try {
    if (!authorization) {
      return res.status(401).send({ mensaje: "Acceso denegado" });
    }

    const token = authorization.split(" ")[1];
    if (token === "null") {
      return res.status(401).send({ mensaje: "Acceso denegado" });
    }

    const payload = jwt.verify(token, "secretkey");
    if (isExpired(token)) {
      return res.status(401).send({ mensaje: "Token no es invalido" });
    }

    if (!payload) {
      return res.status(401).send({ mensaje: "Acceso denegado" });
    }

    req._id = payload._id;
    next();
  } catch (e) {
    return res.status(401).send({ mensaje: "Token no es valido" });
  }
};

module.exports = { verifyToken, isExpired };
