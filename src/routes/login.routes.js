const express = require("express");
const router = express.Router();

const jwt = require('jsonwebtoken');

const usuariosModelo = require("../models/usuarios");


router.post('/login', async (req, res) => {
    const { usuario, password } = req.body;

    const usuarios = await usuariosModelo.findOne({ usuario });

    if (!usuarios) return res.status(401).json({ mensaje: "Usuario no registrado" });
    if (usuarios.estadoUsuario === "true") {
        if (usuarios.usuario !== usuario) return res.status(401).json({ mensaje: "Usuario Incorrecto" });
        if (usuarios.password !== password) return res.status(401).json({ mensaje: "Contraseña Incorrecta" });

        const token = await jwt.sign({ _: usuarios._id }, 'secretkey', {
            expiresIn: 86400
        });

        res.status(200).json({ token });
    } else {
        return res.status(401).json({ mensaje: "Inicio de sesion no autorizado" })
    }

});

async function verifyToken(req, res, next) {
    try {
        if (!req.headers.authorization) {
            return res.status(401).send({ mensaje: "Petición no Autorizada" });
        }
        let token = req.headers.authorization.split(' ')[1];
        if (token === 'null') {
            return res.status(401).send({ mensaje: "Petición no Autorizada" });
        }

        const payload = await jwt.verify(token, 'secretkey');
        if (!payload) {
            return res.status(401).send({ mensaje: "Petición no Autorizada" });
        }
        req._id = payload._id;
        next();
    } catch (e) {
        //console.log(e)
        return res.status(401).send({ mensaje: "Petición no Autorizada" });
    }
}

module.exports = router;
