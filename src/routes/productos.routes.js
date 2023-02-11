const express = require("express");
const router = express.Router();
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

// Obtener los productos
router.get("/listar", async (req, res) => {
    await productos
        .find()
        .sort({ _id: -1 })
        .then((data) => res.json(data))
        .catch((error) => res.json({ message: error }));
});

// Obtener los productos activos con paginacion
router.get("/listarPaginandoActivos", async (req, res) => {
    const { pagina, limite } = req.query;

    const skip = (pagina - 1) * limite;

    await productos
        .find({ estado: "true" })
        .sort({ _id: -1 })
        .skip(skip)
        .limit(limite)
        .then((data) => res.json(data))
        .catch((error) => res.json({ message: error }));
});

// Obtener el total de los productos activos
router.get("/totalProductosActivos", async (_req, res) => {
    await productos
        .find({ estado: "true" })
        .count()
        .sort({ _id: -1 })
        .then((data) => res.json(data))
        .catch((error) => res.json({ message: error }));
});

// Obtener los productos cancelados con paginación
router.get("/listarPaginandoCancelados", async (req, res) => {
    const { pagina, limite } = req.query;

    const skip = (pagina - 1) * limite;

    await productos
        .find({ estado: "false" })
        .sort({ _id: -1 })
        .skip(skip)
        .limit(limite)
        .then((data) => res.json(data))
        .catch((error) => res.json({ message: error }));
});

// Obtener el total de los productos cancelados
router.get("/totalProductosCancelados", async (_req, res) => {
    await productos
        .find({ estado: "false" })
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
        .find({ estado: "true", categoria })
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

// Cambiar el estado de un producto
router.put("/cancelar/:id", async (req, res) => {
    const { id } = req.params;
    const { estado } = req.body;
    await productos
        .updateOne({ _id: id }, { $set: { estado } })
        .then((data) => res.status(200).json({ mensaje: "Estado del producto actualizado" }))
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
