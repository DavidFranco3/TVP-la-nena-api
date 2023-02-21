const mongoose = require("mongoose");
const { Schema } = mongoose;

// modelo de la coleccion categorias
const ingredientes = new Schema({
  nombre: { type: String },
  tipoUM: { type: String },
  negocio: {type: String },
  um: { type: String },
  costo: { type: String },
  imagen: { type: String },
  estado: { type: String },
}, {
  timestamps: true
});

module.exports = mongoose.model("ingredientes", ingredientes, " ingredientes");