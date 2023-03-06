const mongoose = require("mongoose");
const { Schema } = mongoose;

// modelo de la coleccion cajas
const cajas = new Schema({
    idCajero: { type: String },
    cajero: { type: String },
    estado: { type: String },
    saldo: { type: String }
}, {
    timestamps: true
});

module.exports = mongoose.model("cajas", cajas, "cajas");
