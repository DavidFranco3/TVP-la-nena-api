const express = require("express");
const router = express.Router();
const unidadesMedida = require("../models/unidadesMedida");

// Registro de administradores
router.post("/registro", async (req, res) => {

    const umRegistrar = unidadesMedida(req.body);
    await umRegistrar
        .save()
        .then((data) =>
            res.status(200).json(
                {
                    mensaje: "Registro exitoso de la UM"
                }
            ))
        .catch((error) => res.json({ message: error }));
});

// Obtener todos las UM
router.get("/listar", async (req, res) => {

    await unidadesMedida
        .find()
        .sort({ _id: -1 })
        .then((data) => res.json(data))
        .catch((error) => res.json({ message: error }));
});

// Obtener todos las UM
router.get("/listarPorTipo", async (req, res) => {
    const { tipo } = req.query;

    await unidadesMedida
        .find({ tipo, estadoUM: "true" })
        .sort({ _id: -1 })
        .then((data) => res.json(data))
        .catch((error) => res.json({ message: error }));
});

// Listar paginando las um registradas
router.get("/listarPaginando", async (req, res) => {
    const { pagina, limite } = req.query;
    //console.log("Pagina ", pagina , " Limite ", limite)

    const skip = (pagina - 1) * limite;

    await unidadesMedida
        .find()
        .sort({ _id: -1 })
        .skip(skip)
        .limit(limite)
        .then((data) => res.json(data))
        .catch((error) => res.json({ message: error }));
});

// Obtener el total de registros de la colección
router.get("/total", async (req, res) => {
    await unidadesMedida
        .find()
        .count()
        .sort({ _id: -1 })
        .then((data) => res.json(data))
        .catch((error) => res.json({ message: error }));
});

// Obtener una um en especifico
router.get("/obtener/:id", async (req, res) => {
    const { id } = req.params;
    //console.log("buscando")
    await unidadesMedida
        .findById(id)
        .then((data) => res.json(data))
        .catch((error) => res.json({ message: error }));
});

// Obtener las ventas activas con paginacion
router.get("/listarPaginandoActivos", async (req, res) => {
    const { pagina, limite } = req.query;
    //console.log("Pagina ", pagina , " Limite ", limite)

    const skip = (pagina - 1) * limite;

    await unidadesMedida
        .find({ estadoUM: "true" })
        .sort({ _id: -1 })
        .skip(skip)
        .limit(limite)
        .then((data) => res.json(data))
        .catch((error) => res.json({ message: error }));
});

// Obtener el total de las ventas activas
router.get("/totalUMActivos", async (_req, res) => {
    await unidadesMedida
        .find({ estadoUM: "true" })
        .count()
        .sort({ _id: -1 })
        .then((data) => res.json(data))
        .catch((error) => res.json({ message: error }));
});

// Obtener las ventas canceladas con paginacion
router.get("/listarPaginandoCancelados", async (req, res) => {
    const { pagina, limite } = req.query;
    //console.log("Pagina ", pagina , " Limite ", limite)

    const skip = (pagina - 1) * limite;

    await unidadesMedida
        .find({ estadoUM: "false" })
        .sort({ _id: -1 })
        .skip(skip)
        .limit(limite)
        .then((data) => res.json(data))
        .catch((error) => res.json({ message: error }));
});

// Obtener el total de las ventas canceladas
router.get("/totalUMCancelados", async (_req, res) => {

    await unidadesMedida
        .find({ estadoUM: "false" })
        .count()
        .sort({ _id: -1 })
        .then((data) => res.json(data))
        .catch((error) => res.json({ message: error }));
});

// Listar paginando los usuarios
router.get("/listarPaginando", async (req, res) => {
    const { pagina, limite } = req.query;
    //console.log("Pagina ", pagina , " Limite ", limite)

    const skip = (pagina - 1) * limite;

    await unidadesMedida
        .find()
        .sort({ _id: -1 })
        .skip(skip)
        .limit(limite)
        .then((data) => res.json(data))
        .catch((error) => res.json({ message: error }));
});

// Borrar una um
router.delete("/eliminar/:id", async (req, res) => {
    const { id } = req.params;
    await unidadesMedida
        .remove({ _id: id })
        .then((data) => res.status(200).json({ mensaje: "UM eliminada" }))
        .catch((error) => res.json({ message: error }));
});

// Deshabilitar la um
router.put("/deshabilitar/:id", async (req, res) => {
    const { id } = req.params;
    const { estadoUM } = req.body;
    await unidadesMedida
        .updateOne({ _id: id }, { $set: { estadoUM } })
        .then((data) => res.status(200).json({ mensaje: "Estado de la UM actualizado" }))
        .catch((error) => res.json({ message: error }));
});

// Actualizar datos de la sucurusal
router.put("/actualizar/:id", async (req, res) => {
    const { id } = req.params;
    const { nombre, abreviatura, tipo } = req.body;
    await unidadesMedida
        .updateOne({ _id: id }, { $set: { nombre, abreviatura, tipo } })
        .then((data) => res.status(200).json({ mensaje: "Datos de la unidad de medida actualizados" }))
        .catch((error) => res.json({ message: error }));
});

module.exports = router;