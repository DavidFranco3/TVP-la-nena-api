const express = require("express");
const router = express.Router();
const ingredientes = require("../models/ingredientes");

// Registro de ingredientes
router.post("/registro", async (req, res) => {
    const datoIngrediente = ingredientes(req.body);
    await datoIngrediente
        .save()
        .then((data) =>
            res.status(200).json(
                {
                    mensaje: "Ingrediente registrado", datos: data
                }
            ))
        .catch((error) => res.json({ message: error }));
});

// Obtener los ingredientes
router.get("/listar", async (req, res) => {
    await ingredientes
        .find({ estado: "true" })
        .sort({ _id: -1 })
        .then((data) => res.json(data))
        .catch((error) => res.json({ message: error }));
});

// Obtener los ingredientes activos con paginacion
router.get("/listarPaginandoActivos", async (req, res) => {
    const { pagina, limite } = req.query;

    const skip = (pagina - 1) * limite;

    await ingredientes
        .find({ estado: "true" })
        .sort({ _id: -1 })
        .skip(skip)
        .limit(limite)
        .then((data) => res.json(data))
        .catch((error) => res.json({ message: error }));
});

// Obtener el total de ingredientes activas
router.get("/totalIngredientesActivos", async (_req, res) => {
    await ingredientes
        .find({ estado: "true" })
        .count()
        .sort({ _id: -1 })
        .then((data) => res.json(data))
        .catch((error) => res.json({ message: error }));
});

// Obtener los ingredientes canceladas con paginacion
router.get("/listarPaginandoCancelados", async (req, res) => {
    const { pagina, limite } = req.query;

    const skip = (pagina - 1) * limite;

    await ingredientes
        .find({ estado: "false" })
        .sort({ _id: -1 })
        .skip(skip)
        .limit(limite)
        .then((data) => res.json(data))
        .catch((error) => res.json({ message: error }));
});

// Obtener el total de ingredientes canceladas
router.get("/totalIngredientesCancelados", async (_req, res) => {
    await ingredientes
        .find({ estado: "false" })
        .count()
        .sort({ _id: -1 })
        .then((data) => res.json(data))
        .catch((error) => res.json({ message: error }));
});

// Obtener un ingrediente en especifico
router.get("/obtener/:id", async (req, res) => {
    const { id } = req.params;
    await ingredientes
        .findById(id)
        .then((data) => res.json(data))
        .catch((error) => res.json({ message: error }));
});

// Borrar un ingrediente
router.delete("/eliminar/:id", async (req, res) => {
    const { id } = req.params;
    await ingredientes
        .remove({ _id: id })
        .then((data) => res.status(200).json({ mensaje: "Ingrediente eliminado" }))
        .catch((error) => res.json({ message: error }));
});

// Cambiar el estado de un ingrediente
router.put("/cancelar/:id", async (req, res) => {
    const { id } = req.params;
    const { estado } = req.body;
    await ingredientes
        .updateOne({ _id: id }, { $set: { estado } })
        .then((data) => res.status(200).json({ mensaje: "Estado del ingrediente actualizado" }))
        .catch((error) => res.json({ message: error }));
});

// Actualizar datos del ingrediente
router.put("/actualizar/:id", async (req, res) => {
    const { id } = req.params;
    const { nombre, umPrimaria, costoUMPrimaria, tipo, umSecundaria, cantidadPiezas, costoUMSecundaria, imagen } = req.body;
    await ingredientes
        .updateOne({ _id: id }, { $set: { nombre, umPrimaria, costoUMPrimaria, tipo, umSecundaria, cantidadPiezas, costoUMSecundaria, imagen } })
        .then((data) => res.status(200).json({ mensaje: "Datos del ingrediente actualizados" }))
        .catch((error) => res.json({ message: error }));
});

module.exports = router;
