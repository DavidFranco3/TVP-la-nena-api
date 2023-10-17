const mongoose = require("mongoose");
const { Schema } = mongoose;

// modelo de la coleccion ventas
const ventas = new Schema({
  numeroTiquet: { type: String },
  cliente: { type: String },
  mesa: { type: String },
  tiquetVenta: { type: String },
  tipo: { type: String },
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
  tipoDescuento: { type: String },
  descuento: { type: String },
  pagado: { type: String },
  total: { type: String },
  iva: { type: String },
  atendido: { type: String },
  comision: { type: String },
  agrupar: { type: String },
  año: { type: String },
  semana: { type: String },
  fecha: {type: String}
}, {
  timestamps: true
});

module.exports = mongoose.model("ventas", ventas, "ventas");
