const mongoose = require("mongoose");
const { Schema } = mongoose;

const ventas = new Schema({
  numeroTiquet: { type: String },
  cliente: { type: String },
  productos: { type: Array, default: [] },
  estado: { type: String },
  detalles: { type: String },
  tipoPago: { type: String },
  efectivo: { type: String },
  cambio: { type: String },
  subtotal: { type: String },
  tipoPedido: { type: String },
  hacerPedido: { type: String },
  total: { type: String },
  iva: { type: String },
  comision: { type: String },
  agrupar: { type: String },
  pdfAlmacenado: { type: String },
  createDate: { type: Date }
}, {
  timestamps: true
});

module.exports = mongoose.model("ventas", ventas, "ventas");
