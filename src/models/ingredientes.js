const mongoose = require("mongoose");
const { Schema } = mongoose;

// modelo de la coleccion categorias
const ingredientes = new Schema({
  nombre: { type: String },
  umPrimaria: { type: String },
  costoAdquisicion: { type: String },
  umAdquisicion: { type: String },
  umProduccion: { type: String },
  costoProduccion: { type: String },
  cantidadPiezas: { type: String },
  movimientos: { type: Array, default: [] },
  cantidad: { type: String },
  negocio: { type: String },
  imagen: { type: String },
  estado: { type: String },
}, {
  timestamps: true
});

module.exports = mongoose.model("ingredientes", ingredientes, " ingredientes");