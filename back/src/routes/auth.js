const express = require("express");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const Usuario = require("../models/Usuario");
require("dotenv").config();

const router = express.Router();

router.post("/register", async (req, res) => {
  const { nombre, email, password } = req.body;
  const hashedPassword = await bcrypt.hash(password, 10);

  try {
    const usuario = await Usuario.create({ nombre, email, password: hashedPassword });
    res.json({ message: "Usuario registrado", usuario });
  } catch (error) {
    res.status(400).json({ error: "Error al registrar usuario" });
  }
});

router.post("/login", async (req, res) => {
  const { email, password } = req.body;
  const usuario = await Usuario.findOne({ where: { email } });

  if (!usuario || !(await bcrypt.compare(password, usuario.password))) {
    return res.status(401).json({ error: "Credenciales inválidas" });
  }

  const token = jwt.sign({ id: usuario.id, rol: usuario.rol }, process.env.JWT_SECRET, { expiresIn: "1h" });

  res.json({ message: "Login exitoso", token, usuario });
});

module.exports = router;
