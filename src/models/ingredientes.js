const mongoose = require("mongoose");
const { Schema } = mongoose;

// modelo de la coleccion categorias
const ingredientes = new Schema({
  nombre: { type: String },
  umPrimaria: { type: String },
  costoUMPrimaria: { type: String },
  tipo: { type: String },
  umSecundaria: { type: String },
  cantidadPiezas: { type: String },
  costoUMSecundaria: { type: String },
  negocio: { type: String },
  imagen: { type: String },
  estado: { type: String },
}, {
  timestamps: true
});

module.exports = mongoose.model("ingredientes", ingredientes, " ingredientes");