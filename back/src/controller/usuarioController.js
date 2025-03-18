const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const User = require("../model/Usuario");
const { loginUser } = require("../service/authService");

exports.register = async (req, res) => {
  try {
    const { nombre, email, password } = req.body;
    const hashedPassword = await bcrypt.hash(password, 10);

    if (!nombre || !email || !password) {
      return res.status(400).json({ error: "Todos los campos son obligatorios" });
    }
      //CAMBIAR POR UN REGEX, SOLO PRUEBA DE MOMENTO
    if (password.length < 6) {
      return res.status(400).json({ error: "La contraseña debe tener al menos 6 caracteres" });
    }

    const existeUser = await User.findOne({where: { email } });
    if (existeUser){
      return res.status(400).json({ error: "El email ya está en uso" });
    }

    const user = await User.create({ nombre, email, password: hashedPassword});

    res.status(201).json({ message: "Usuario registrado con éxito", user });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};


exports.login = async (req, res) => {
  try {
    console.log(req.body)
    const { email, password } = req.body;
    console.log(email);
    console.log(password);
    const { token, user } = await loginUser(email, password);
    res.json({ message: "Login exitoso", token, user });
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

//Actualizar, borrar