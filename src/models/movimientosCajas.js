const mongoose = require("mongoose");
const { Schema } = mongoose;

// modelo de la coleccion de movimientos de cajas
const movimientosCajas = new Schema({
    idCaja: { type: String },
    idCajero: { type: String },
    cajero: { type: String },
    movimiento: { type: String },
    pago: {type: String},
    monto: { type: String },
    estado: { type: String },
}, {
    timestamps: true
});

module.exports = mongoose.model("movimientosCajas", movimientosCajas, "movimientosCajas");
