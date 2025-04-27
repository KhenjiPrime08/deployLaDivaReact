const express = require("express");
const router = express.Router();
const { obtenerCitasConfirmadas } = require("../controller/citaConfirmadaController");
const verificarToken = require("../middleware/authMiddleware");

router.post("/citas-confirmadas/:usuarioId", verificarToken, obtenerCitasConfirmadas); // Obtener citas confirmadas de un usuario

module.exports = router;