const mongoose = require('mongoose');

// Credenciales para conexion local a la BD
const URI = "mongodb://localhost:27017/TPV-LA-NENA-PRUEBAS";

// Credenciales para conexion a Mongo Atlas
//const URI = "mongodb+srv://tpv-la-nena:74CDFTgpyW5783eh@cluster0.dsbmu.mongodb.net/TPV-LA-NENA"; // tpv en produccion

//const URI = "mongodb+srv://tpv-la-nena:74CDFTgpyW5783eh@cluster0.dsbmu.mongodb.net/TPV-LA-NENA-PRUEBAS"; // tpv test

//const URI = "mongodb://127.0.0.1/TPV-LA-NENA-PRUEBAS";

mongoose.connect(URI)
    .then(db => console.log("DB is connected"))
    .catch(error => console.error(error));

module.exports = mongoose;
