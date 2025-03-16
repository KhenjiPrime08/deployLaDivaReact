const { DataTypes } = require("sequelize");
const db = require("../config/db");

const Usuario = db.define("Usuario", {
  id: { type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true },
  nombre: { type: DataTypes.STRING, allowNull: false },
  email: { type: DataTypes.STRING, unique: true, allowNull: false },
  password: { type: DataTypes.STRING, allowNull: false },
  rol: { type: DataTypes.ENUM("cliente", "admin"), defaultValue: "cliente" },
});

module.exports = Usuario;
