require("dotenv").config(); 
const express = require("express");
const cors = require("cors");
const db = require("./src/config/db"); 
const usuarioRutas = require("./src/routes/usuario"); // Rutas de usuario
const citaRutas = require("./src/routes/citas"); // Rutas de citas
const uploadRoutes = require("./src/routes/upload");//Ruta de las imagenes

const app = express();
const categoria = "gemas"

// Middlewares
app.use(cors()); // Permitir peticiones desde otros dominios
app.use(express.json()); // Habilitar JSON en las peticiones
app.use(express.urlencoded({ extended: true }));

const PORT = process.env.PORT || 8080;

// Rutas
app.use("/api/usuario", usuarioRutas); // Endpoints de autenticación
app.use("/api/citas", citaRutas); // Endpoints para citas
app.use("/api/upload", uploadRoutes); //Endpoints para las imagenes

// Sincronizar base de datos y arrancar el servidor
db.sync({ force: false }) // ⚠️ Si cambias a { force: true }, se borrarán las tablas y se recrearán
  .then(() => {
    console.log("✅ Base de datos conectada");
    app.listen(PORT, () => console.log(`🚀 Servidor corriendo en http://localhost:${PORT}`));
  })
  .catch(error => console.error("❌ Error al conectar la base de datos:", error));
