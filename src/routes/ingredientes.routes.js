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

// Obtener los ingredientes
router.get("/listarMovimientosIngredientes/:id", async (req, res) => {
    const { id } = req.params;

    await ingredientes
        .findOne({ _id: id })
        .sort({ _id: -1 })
        .then((data) => {
            res.status(200).json(data.movimientos.reverse())
        })
        .catch((error) => res.json({ message: error }));
});

// Para obtener el listado de movimientos de una materia prima
router.get("/listarMovimientosIngredientesPaginacion", async (req, res) => {
    const { id, pagina, limite } = req.query;

    const skip = (pagina - 1) * limite;

    await ingredientes
        .findOne({ _id: id })
        .sort({ _id: -1 })
        .skip(skip)
        .limit(limite)
        .then((data) => {
            res.status(200).json(data.movimientos.reverse())
        })
        .catch((error) => res.json({ message: error }));
});

// Obtener el total de ingredientes activas
router.get("/totalMovimientosIngrediente", async (req, res) => {
    const { id } = req.query;
    await ingredientes
        .findOne({ _id: id })
        .count()
        .sort({ _id: -1 })
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
        .deleteOne({ _id: id })
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

// Registro de entrada y salida de almacen de materias primas
router.put("/registraMovimientos/:id", async (req, res) => {
    const { id } = req.params;
    const { movimientos, cantidad } = req.body;
    await ingredientes
        .updateOne({ _id: id }, { $set: { movimientos, cantidad } })
        .then((data) => res.status(200).json({ mensaje: "Se ha registrado un movimiento de ingrediente", datos: data}))
        .catch((error) => res.json({ message: error }));
});

// Actualizar datos del ingrediente
router.put("/actualizar/:id", async (req, res) => {
    const { id } = req.params;
    const { nombre, umPrimaria, costoAdquisicion, umAdquisicion, umProduccion, costoProduccion, cantidadPiezas, cantidad, movimientos, imagen } = req.body;
    await ingredientes
        .updateOne({ _id: id }, { $set: { nombre, umPrimaria, costoAdquisicion, umAdquisicion, umProduccion, costoProduccion, cantidadPiezas, cantidad, movimientos, imagen } })
        .then((data) => res.status(200).json({ mensaje: "Datos del ingrediente actualizados" }))
        .catch((error) => res.json({ message: error }));
});

module.exports = router;
