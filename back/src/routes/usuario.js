const express = require("express");
const router = express.Router();
const { register, login, verifyEmail, actualizarUser, buscarUser, borrarUser, contact } = require("../controller/usuarioController");
const verificarToken = require("../middleware/authMiddleware");
require("dotenv").config();


router.post("/register", register);
router.post("/login", login);
router.post("/verificar", verifyEmail);
router.post("/contacto", contact);


router.put("/editar/:id", verificarToken, actualizarUser);
router.get("/:id", verificarToken, buscarUser);
router.delete("/eliminar/:id", verificarToken, borrarUser);

module.exports = router;
