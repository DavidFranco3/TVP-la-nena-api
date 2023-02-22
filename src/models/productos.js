const mongoose = require("mongoose");
const { Schema } = mongoose;

// modelo de la coleccion productos
const productos = new Schema({
  nombre: { type: String },
  categoria: { type: String },
  negocio: { type: String },
  costoProduccion: { type: String },
  precio: { type: String },
  imagen: { type: String },
  ingredientes: { type: Array, default: [] },
  estado: { type: String },
}, {
  timestamps: true
});

module.exports = mongoose.model("productos", productos, "productos");
