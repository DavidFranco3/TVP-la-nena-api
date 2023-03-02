const mongoose = require("mongoose");
const { Schema } = mongoose;

// modelo de la coleccion de movimientos de cajas
const movimientosCajas = new Schema({
    idCajero: { type: String },
    cajero: { type: String },
    movimiento: { type: String },
    monto: { type: String },
}, {
    timestamps: true
});

module.exports = mongoose.model("movimientosCajas", movimientosCajas, "movimientosCajas");
