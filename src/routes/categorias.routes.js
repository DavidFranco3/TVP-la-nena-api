const express = require("express");
const router = express.Router();
const jwt = require('jsonwebtoken');
const jwtDecode = require("jwt-decode");
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
        .find()
        .sort({ _id: -1 })
        .then((data) => res.json(data))
        .catch((error) => res.json({ message: error }));
});

// Listar paginando las categorias
router.get("/listarPaginando", async (req, res) => {
    const { pagina, limite } = req.query;
    //console.log("Pagina ", pagina , " Limite ", limite)

    const skip = (pagina - 1) * limite;

    await categorias
        .find()
        .sort({ _id: -1 })
        .skip(skip)
        .limit(limite)
        .then((data) => res.json(data))
        .catch((error) => res.json({ message: error }));
});

// Listar paginando las ventas
router.get("/totalCategorias", async (_req, res) => {
    await categorias
        .find()
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
