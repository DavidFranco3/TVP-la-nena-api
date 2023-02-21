const Sentry = require("@sentry/node");
const Tracing = require("@sentry/tracing");
const express = require("express");
const favicon = require("serve-favicon");
const path = require("path");
const morgan = require("morgan");
const cors = require("cors");

require("./src/database");

const file = path.join(__dirname, "favicon.ico");

const notFound = require("./src/middleware/notFound");
const handleErrors = require("./src/middleware/handleErrors");
const { verifyToken } = require("./src/middleware/verifyToken");

// Configuración del servidor
const app = express();

Sentry.init({
  dsn: "https://34cda94143a14ff3938078498a0bc8e4@o1301469.ingest.sentry.io/6538433",
  integrations: [
    // enable HTTP calls tracing
    new Sentry.Integrations.Http({ tracing: true }),
    // enable Express.js middleware tracing
    new Tracing.Integrations.Express({ app }),
  ],

  // Set tracesSampleRate to 1.0 to capture 100%
  // of transactions for performance monitoring.
  // We recommend adjusting this value in production
  tracesSampleRate: 1.0,
});

// RequestHandler creates a separate execution context using domains, so that every
// transaction/span/breadcrumb is attached to its own Hub instance
app.use(Sentry.Handlers.requestHandler());
// TracingHandler creates a trace for every incoming request
app.use(Sentry.Handlers.tracingHandler());

// Configuracion para desplegar
const PORT = process.env.PORT || 5050;

app.all("*", (req, res, next) => {
  res.header("Access-Control-Allow-Origin", "*");
  res.header(
    "Access-Control-Allow-Headers",
    "Authorization, responseType, X-API-KEY, Origin, X-Requested-With, Content-Type, Accept, Access-Control-Allow-Request-Method"
  );
  res.header("Access-Control-Allow-Methods", "GET, POST, OPTIONS, PUT, DELETE");
  res.header("Allow", "GET, POST, OPTIONS, PUT, DELETE");

  if (req.method === "OPTIONS") {
    res.status(200).end();
  } else {
    next();
  }
});

app.get("/", (_req, res) => {
  return res.status(200).json({
    mensaje: "API del Terminal Punto de Venta LA NENA, Propiedad de ISOTECH MÉXICO",
  });
});

// Middlewares
app.use(morgan("dev"));
app.use(express.json());
app.use(favicon(file));
app.use(cors());

// Routes
app.use(require("./src/routes/login.routes"));
app.use("/usuarios/", verifyToken, require("./src/routes/usuarios.routes"));
app.use("/ventas/", verifyToken, require("./src/routes/ventas.routes"));
app.use("/categorias/", verifyToken, require("./src/routes/categorias.routes"));
app.use("/productos/", verifyToken, require("./src/routes/productos.routes"));
app.use("/unidadesMedida/", verifyToken, require("./src/routes/unidadesMedida.routes"));

app.use(notFound);
app.use(Sentry.Handlers.errorHandler());
app.use(handleErrors);

// Inicio del servidor en modo local
const server = app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});

module.exports = { server, app };

