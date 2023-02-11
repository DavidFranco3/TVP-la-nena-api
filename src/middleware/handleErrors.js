// Para obtener los errores
module.exports = (error, _req, res, _next) => {
  console.error(error);

  error.name === "CastError" &&
    res.status(400).send({ error: "id used is malformed" });

  res.status(500).end();
};
