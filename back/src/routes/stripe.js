const express = require("express");
const router = express.Router();
const { pagar } = require("../controller/stripeController");

router.post("/pagar/:citaId", pagar); // Crear un pago

module.exports = router;