const express = require("express");
const router = express.Router();
const { crearPago, pagar } = require("../controller/stripeController");

router.post("/crear", crearPago); // Crear un pago
router.post("/pagar", pagar); // Crear un pago

module.exports = router;