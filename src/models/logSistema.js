const mongoose = require("mongoose");
const { Schema } = mongoose;

const logSistema = new Schema({
    folio: { type: String },
    usuario: { type: String },
    dispositivo: { type: String },
    ip: { type: String },
    descripcion: { type: String },
    detalles: {
        mensaje: { type: String },
        datos: { type: Array, default: [] }
    }
}, {
    timestamps: true
});

module.exports = mongoose.model("logSistema", logSistema, "logSistema");