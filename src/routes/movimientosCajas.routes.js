const express = require("express");
const router = express.Router();
const movimientosCajas = require("../models/movimientosCajas");

// Registro de movimientos de cajas
router.post("/registro", async (req, res) => {
    const datoMovimiento = movimientosCajas(req.body);
    await datoMovimiento
        .save()
        .then((data) =>
            res.status(200).json(
                {
                    mensaje: "Movimiento de caja registrado", datos: data
                }
            ))
        .catch((error) => res.json({ message: error }));
});

// Obtener los movimientos de cajas
router.get("/listar", async (req, res) => {
    await movimientosCajas
        .find({ estado: "true" })
        .sort({ _id: -1 })
        .then((data) => res.json(data))
        .catch((error) => res.json({ message: error }));
});

// Obtener las cajas activas con paginacion
router.get("/listarPaginando", async (req, res) => {
    const { pagina, limite, idCaja } = req.query;

    console.log(idCaja);

    const skip = (pagina - 1) * limite;

    await movimientosCajas
        .find({ idCaja })
        .sort({ _id: -1 })
        .skip(skip)
        .limit(limite)
        .then((data) => res.json(data))
        .catch((error) => res.json({ message: error }));
});

// Obtener el total de cajas activas
router.get("/totalMovimientos", async (req, res) => {
    const { idCaja } = req.query;

    await movimientosCajas
        .find({ idCaja })
        .count()
        .sort({ _id: -1 })
        .then((data) => res.json(data))
        .catch((error) => res.json({ message: error }));
});

// Obtener las cajas activas con paginacion
router.get("/listarPaginandoActivas", async (req, res) => {
    const { pagina, limite } = req.query;

    const skip = (pagina - 1) * limite;

    await movimientosCajas
        .find({ estado: "true" })
        .sort({ _id: -1 })
        .skip(skip)
        .limit(limite)
        .then((data) => res.json(data))
        .catch((error) => res.json({ message: error }));
});

// Obtener el total de cajas activas
router.get("/totalMovimientosActivas", async (_req, res) => {
    await movimientosCajas
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

    await movimientosCajas
        .find({ estado: "false" })
        .sort({ _id: -1 })
        .skip(skip)
        .limit(limite)
        .then((data) => res.json(data))
        .catch((error) => res.json({ message: error }));
});

// Obtener el total de cajas canceladas
router.get("/totalMovimientosCanceladas", async (_req, res) => {
    await movimientosCajas
        .find({ estado: "false" })
        .count()
        .sort({ _id: -1 })
        .then((data) => res.json(data))
        .catch((error) => res.json({ message: error }));
});

// Obtener una caja en especifico
router.get("/obtener/:id", async (req, res) => {
    const { id } = req.params;
    await movimientosCajas
        .findById(id)
        .then((data) => res.json(data))
        .catch((error) => res.json({ message: error }));
});

// Borrar una caja
router.delete("/eliminar/:id", async (req, res) => {
    const { id } = req.params;
    await movimientosCajas
        .remove({ _id: id })
        .then((data) => res.status(200).json({ mensaje: "Caja eliminada" }))
        .catch((error) => res.json({ message: error }));
});

// Cambiar el estado de una caja
router.put("/cancelar/:id", async (req, res) => {
    const { id } = req.params;
    const { estado } = req.body;
    await movimientosCajas
        .updateOne({ _id: id }, { $set: { estado } })
        .then((data) => res.status(200).json({ mensaje: "Estado del movimiento actualizado" }))
        .catch((error) => res.json({ message: error }));
});

// Actualizar datos de la categoria
router.put("/actualizar/:id", async (req, res) => {
    const { id } = req.params;
    const { idCajero, cajero, saldo } = req.body;
    await movimientosCajas
        .updateOne({ _id: id }, { $set: { idCajero, cajero, saldo } })
        .then((data) => res.status(200).json({ mensaje: "Datos de la caja actualizados" }))
        .catch((error) => res.json({ message: error }));
});

module.exports = router;
