// routes/calendarRoutes.js
const express = require('express');
const { crearEvento, getEventos } = require('../controller/calendarController');
const verificarToken = require("../middleware/authMiddleware"); 
require('dotenv').config();

const router = express.Router();

router.post('/crear', verificarToken, crearEvento);

router.get('/eventos', verificarToken, getEventos)

module.exports = router;

