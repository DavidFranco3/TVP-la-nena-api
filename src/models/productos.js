const mongoose = require("mongoose");
const { Schema } = mongoose;

const productos = new Schema({
  nombre: { type: String },
  categoria: { type: String },
  negocio: { type: String },
  precio: { type: String },
  imagen: { type: String },
  createDate: { type: Date }
}, {
  timestamps: true
});

module.exports = mongoose.model("productos", productos, "productos");
