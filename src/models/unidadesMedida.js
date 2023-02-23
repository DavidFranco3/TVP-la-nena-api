const mongoose = require("mongoose");
const { Schema } = mongoose;

const unidadesMedida = new Schema({
    nombre: { type: String },
    estadoUM: { type: String }
}, {
    timestamps: true
});

module.exports = mongoose.model("unidadesMedida", unidadesMedida, "unidadesMedida");