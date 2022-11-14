const express = require("express");
const router = express.Router();
const jwt = require('jsonwebtoken');
const jwtDecode = require("jwt-decode");
const productos = require("../models/productos");

// Registro de productos
router.post("/registro", async (req, res) => {
    const datoProducto = productos(req.body);
    await datoProducto
        .save()
        .then((data) =>
            res.status(200).json(
                {
                    mensaje: "Producto registrado"
                }
            ))
        .catch((error) => res.json({ message: error }));
});

// Obtener las productos
router.get("/listar", async (req, res) => {
    await productos
        .find()
        .sort({ _id: -1 })
        .then((data) => res.json(data))
        .catch((error) => res.json({ message: error }));
});

// Listar paginando los productos
router.get("/listarPaginando", async (req, res) => {
    const { pagina, limite } = req.query;
    //console.log("Pagina ", pagina , " Limite ", limite)

    const skip = (pagina - 1) * limite;

    await productos
        .find()
        .sort({ _id: -1 })
        .skip(skip)
        .limit(limite)
        .then((data) => res.json(data))
        .catch((error) => res.json({ message: error }));
});

// Listar paginando las ventas
router.get("/totalProductos", async (_req, res) => {
    await productos
        .find()
        .count()
        .sort({ _id: -1 })
        .then((data) => res.json(data))
        .catch((error) => res.json({ message: error }));
});

// Obtener el listado de producto segun la categoria
router.get("/listarFiltroCategoria", async (req, res) => {
    const { categoria } = req.query;
    // console.log(categoria)
    await productos
        .find({ categoria })
        .sort({ _id: -1 })
        .then((data) => res.json(data))
        .catch((error) => res.json({ message: error }));
});

// Obtener una producto en especifico
router.get("/obtener/:id", async (req, res) => {
    const { id } = req.params;
    await productos
        .findById(id)
        .then((data) => res.json(data))
        .catch((error) => res.json({ message: error }));
});

// Borrar un producto
router.delete("/eliminar/:id", async (req, res) => {
    const { id } = req.params;
    await productos
        .remove({ _id: id })
        .then((data) => res.status(200).json({ mensaje: "Producto eliminado" }))
        .catch((error) => res.json({ message: error }));
});

// Actualizar datos del producto
router.put("/actualizar/:id", async (req, res) => {
    const { id } = req.params;
    const { nombre, categoria, negocio, precio, imagen } = req.body;
    await productos
        .updateOne({ _id: id }, { $set: { nombre, categoria, negocio, precio, imagen } })
        .then((data) => res.status(200).json({ mensaje: "Datos del producto actualizados" }))
        .catch((error) => res.json({ message: error }));
});

module.exports = router;
