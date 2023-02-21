const mongoose = require("mongoose");
const { Schema } = mongoose;

const unidadesMedida = new Schema({
    nombre: { type: String },
    abreviatura: { type: String },
    tipo: { type: String },
    estadoUM: { type: String }
}, {
    timestamps: true
});

module.exports = mongoose.model("unidadesMedida", unidadesMedida, "unidadesMedida");