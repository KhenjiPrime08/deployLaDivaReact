const express = require("express");
const router = express.Router();
const { register, login } = require("../controller/usuarioController");
const verificarToken = require("../middleware/authMiddleware");
require("dotenv").config();




router.post("/register", register);
router.post("/login", login);
//router.put("/:id", verificarToken, actualizarUser);
//router.delete("/:id", verificarToken, borrarUser);

module.exports = router;
