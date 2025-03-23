const express = require("express");
const router = express.Router();
const { register, login, verifyEmail, actualizarUser } = require("../controller/usuarioController");
const verificarToken = require("../middleware/authMiddleware");
require("dotenv").config();


router.post("/register", register);
router.post("/login", login);
router.post("/verificar", verifyEmail);
router.put("/editar/:id", verificarToken, actualizarUser);
//router.delete("/:id", verificarToken, borrarUser);

module.exports = router;
