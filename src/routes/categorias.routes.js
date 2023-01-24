const express = require("express");
const router = express.Router();
const categorias = require("../models/categorias");

// Registro de categorias
router.post("/registro", async (req, res) => {
    const datoCategoria = categorias(req.body);
    await datoCategoria
        .save()
        .then((data) =>
            res.status(200).json(
                {
                    mensaje: "Categoría registrada"
                }
            ))
        .catch((error) => res.json({ message: error }));
});

// Obtener las categorias
router.get("/listar", async (req, res) => {
    await categorias
        .find({ estado: "true" })
        .sort({ _id: -1 })
        .then((data) => res.json(data))
        .catch((error) => res.json({ message: error }));
});

// Obtener las categorias con paginacion
router.get("/listarPaginandoActivas", async (req, res) => {
    const { pagina, limite } = req.query;

    const skip = (pagina - 1) * limite;

    await categorias
        .find({ estado: "true" })
        .sort({ _id: -1 })
        .skip(skip)
        .limit(limite)
        .then((data) => res.json(data))
        .catch((error) => res.json({ message: error }));
});

// Obtener el total de categorias
router.get("/totalCategoriasActivas", async (_req, res) => {
    await categorias
        .find({ estado: "true" })
        .count()
        .sort({ _id: -1 })
        .then((data) => res.json(data))
        .catch((error) => res.json({ message: error }));
});

// Obtener las categorias con paginacion
router.get("/listarPaginandoCanceladas", async (req, res) => {
    const { pagina, limite } = req.query;

    const skip = (pagina - 1) * limite;

    await categorias
        .find({ estado: "false" })
        .sort({ _id: -1 })
        .skip(skip)
        .limit(limite)
        .then((data) => res.json(data))
        .catch((error) => res.json({ message: error }));
});

// Obtener el total de categorias
router.get("/totalCategoriasCanceladas", async (_req, res) => {
    await categorias
        .find({ estado: "false" })
        .count()
        .sort({ _id: -1 })
        .then((data) => res.json(data))
        .catch((error) => res.json({ message: error }));
});

// Obtener una categoria en especifico
router.get("/obtener/:id", async (req, res) => {
    const { id } = req.params;
    await categorias
        .findById(id)
        .then((data) => res.json(data))
        .catch((error) => res.json({ message: error }));
});

// Borrar una categoria
router.delete("/eliminar/:id", async (req, res) => {
    const { id } = req.params;
    await categorias
        .remove({ _id: id })
        .then((data) => res.status(200).json({ mensaje: "Categoría eliminada" }))
        .catch((error) => res.json({ message: error }));
});

// Cambiar el estado de una categoria
router.put("/cancelar/:id", async (req, res) => {
    const { id } = req.params;
    const { estado } = req.body;
    await categorias
        .updateOne({ _id: id }, { $set: { estado } })
        .then((data) => res.status(200).json({ mensaje: "Estado de la categoría actualizado" }))
        .catch((error) => res.json({ message: error }));
});

// Actualizar datos de la categoria
router.put("/actualizar/:id", async (req, res) => {
    const { id } = req.params;
    const { nombre, negocio, imagen } = req.body;
    await categorias
        .updateOne({ _id: id }, { $set: { nombre, negocio, imagen } })
        .then((data) => res.status(200).json({ mensaje: "Datos de la categoría actualizados" }))
        .catch((error) => res.json({ message: error }));
});

module.exports = router;
