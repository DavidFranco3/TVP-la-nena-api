const mongoose = require("mongoose");
const { Schema } = mongoose;

const usuarios = new Schema({
    nombre: { type: String },
    apellidos: { type: String },
    telefono: { type: String },
    direccion: { type: String },
    usuario: { type: String },
    admin: { type: String },
    correo: { type: String },
    password: { type: String },
    foto: { type: String },
    estadoUsuario: { type: String }
}, {
    timestamps: true
});

module.exports = mongoose.model("usuarios", usuarios, "usuarios");
