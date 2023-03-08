const mongoose = require("mongoose");
const { Schema } = mongoose;

// modelo de la coleccion ventas
const pedidosClientes = new Schema({
  numeroTiquet: { type: String },
  cliente: { type: String },
  usuario: { type: String },
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
  direccion: { type: String },
}, {
  timestamps: true
});

module.exports = mongoose.model("pedidosClientes", pedidosClientes, "pedidosClientes");
