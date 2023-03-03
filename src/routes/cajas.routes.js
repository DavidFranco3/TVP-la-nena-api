const express = require("express");
const router = express.Router();
const cajas = require("../models/cajas");

// Registro de cajas
router.post("/registro", async (req, res) => {
    const datoCaja = cajas(req.body);
    await datoCaja
        .save()
        .then((data) =>
            res.status(200).json(
                {
                    mensaje: "Caja registrada", datos: data
                }
            ))
        .catch((error) => res.json({ message: error }));
});

// Obtener las cajas
router.get("/listar", async (req, res) => {
    await cajas
        .find({ estado: "true" })
        .sort({ _id: -1 })
        .then((data) => res.json(data))
        .catch((error) => res.json({ message: error }));
});

// Obtener las cajas activas con paginacion
router.get("/listarPaginando", async (req, res) => {
    const { pagina, limite } = req.query;

    const skip = (pagina - 1) * limite;

    await cajas
        .find()
        .sort({ _id: -1 })
        .skip(skip)
        .limit(limite)
        .then((data) => res.json(data))
        .catch((error) => res.json({ message: error }));
});

// Obtener el total de cajas activas
router.get("/totalCajas", async (_req, res) => {
    await cajas
        .find()
        .count()
        .sort({ _id: -1 })
        .then((data) => res.json(data))
        .catch((error) => res.json({ message: error }));
});

// Obtener las cajas activas con paginacion
router.get("/listarPaginandoActivas", async (req, res) => {
    const { pagina, limite } = req.query;

    const skip = (pagina - 1) * limite;

    await cajas
        .find({ estado: "true" })
        .sort({ _id: -1 })
        .skip(skip)
        .limit(limite)
        .then((data) => res.json(data))
        .catch((error) => res.json({ message: error }));
});

// Obtener el total de cajas activas
router.get("/totalCajasActivas", async (_req, res) => {
    await cajas
        .find({ estado: "true" })
        .count()
        .sort({ _id: -1 })
        .then((data) => res.json(data))
        .catch((error) => res.json({ message: error }));
});

// Obtener las cajas canceladas con paginacion
router.get("/listarPaginandoCanceladas", async (req, res) => {
    const { pagina, limite } = req.query;

    const skip = (pagina - 1) * limite;

    await cajas
        .find({ estado: "false" })
        .sort({ _id: -1 })
        .skip(skip)
        .limit(limite)
        .then((data) => res.json(data))
        .catch((error) => res.json({ message: error }));
});

// Obtener el total de cajas canceladas
router.get("/totalCajasCanceladas", async (_req, res) => {
    await cajas
        .find({ estado: "false" })
        .count()
        .sort({ _id: -1 })
        .then((data) => res.json(data))
        .catch((error) => res.json({ message: error }));
});

// Obtener una caja en especifico
router.get("/obtener/:id", async (req, res) => {
    const { id } = req.params;
    await cajas
        .findById(id)
        .then((data) => res.json(data))
        .catch((error) => res.json({ message: error }));
});

// Borrar una caja
router.delete("/eliminar/:id", async (req, res) => {
    const { id } = req.params;
    await cajas
        .deleteOne({ _id: id })
        .then((data) => res.status(200).json({ mensaje: "Caja eliminada" }))
        .catch((error) => res.json({ message: error }));
});

// Cambiar el estado de una caja
router.put("/cancelar/:id", async (req, res) => {
    const { id } = req.params;
    const { estado } = req.body;
    await cajas
        .updateOne({ _id: id }, { $set: { estado } })
        .then((data) => res.status(200).json({ mensaje: "Estado de la caja actualizado" }))
        .catch((error) => res.json({ message: error }));
});

// Actualizar datos de la categoria
router.put("/actualizar/:id", async (req, res) => {
    const { id } = req.params;
    const { saldo } = req.body;
    await cajas
        .updateOne({ _id: id }, { $set: { saldo } })
        .then((data) => res.status(200).json({ mensaje: "Datos de la caja actualizados" }))
        .catch((error) => res.json({ message: error }));
});

module.exports = router;
