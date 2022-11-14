const mongoose = require("mongoose");
const { Schema } = mongoose;

const categorias = new Schema({
  nombre: { type: String },
  negocio: { type: String },
  imagen: { type: String },
  createDate: { type: Date }
}, {
  timestamps: true
});

module.exports = mongoose.model("categorias", categorias, "categorias");
