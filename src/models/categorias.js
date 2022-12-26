const mongoose = require("mongoose");
const { Schema } = mongoose;

// modelo de la coleccion categorias
const categorias = new Schema({
  nombre: { type: String },
  negocio: { type: String },
  imagen: { type: String },
  estado: { type: String },
}, {
  timestamps: true
});

module.exports = mongoose.model("categorias", categorias, "categorias");
