const { DataTypes } = require("sequelize");
const db = require("../config/db");

const Cita = db.define("Cita", {
  id: { type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true },
  usuarioId: { type: DataTypes.INTEGER, allowNull: false },
  fecha: { type: DataTypes.DATEONLY, allowNull: false },
  hora: { type: DataTypes.TIME, allowNull: false },
  servicio: { type: DataTypes.ENUM("tatuaje", "piercing", "gema_dental"), allowNull: false },
  estado: { type: DataTypes.ENUM("pendiente", "confirmado", "cancelado"), defaultValue: "pendiente" },
});

module.exports = Cita;
