const mongoose = require('mongoose');

// Credenciales para conexion local a la BD
// const URI = "mongodb://127.0.0.1/TPV-LA-NENA-PRUEBAS";


// Credenciales para conexion a Mongo Atlas
const URI = "mongodb+srv://tpv-la-nena:74CDFTgpyW5783eh@cluster0.dsbmu.mongodb.net/TPV-LA-NENA-PRUEBAS"; // tpv test

mongoose.Promise = global.Promise;

mongoose.set('strictQuery', true);

mongoose
  .connect(URI, {
    useNewUrlParser: true,
  })
  .then(() => {
    console.log("Database connection successful");
  })
  .catch((err) => {
    console.log("Database connection error: ", err);
  });

process.on("uncaughtException", (err, origin) => {
  console.error("Caught exception: " + err);
  console.error("Exception origin: " + origin);
});

module.exports = mongoose;
