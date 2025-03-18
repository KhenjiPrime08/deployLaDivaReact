const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const User = require("../model/Usuario");

const generateToken = (user) => {
  return jwt.sign({ id: user.id, email: user.email }, process.env.JWT_SECRET, { expiresIn: "1h" });
};

const loginUser = async (email, password) => {
  const user = await User.findOne({ where: { email } });
  if (!user) throw new Error("Usuario no encontrado");

  const isMatch = await bcrypt.compare(password, user.password);
  if (!isMatch) throw new Error("Contraseña incorrecta");

  const token = generateToken(user);
  return { token, user };
};

module.exports = { loginUser };
