const { DataTypes } = require("sequelize");
const db = require("../config/db");

const Pagos = db.define("Pago", {
  id: { type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true },
  usuarioId: { type: DataTypes.INTEGER, allowNull: false },
  citaId: { type: DataTypes.INTEGER, allowNull: false },
  servicio: { type: DataTypes.ENUM("tatuaje", "piercing", "gema_dental"), allowNull: false },
  stripeSessionId: { type: DataTypes.STRING, allowNull: false },
  cantidad: { type: DataTypes.FLOAT, allowNull: false },
  estado: {
    type: DataTypes.ENUM("pendiente", "completado", "fallido"),
    defaultValue: "pendiente"
  }
});

module.exports = Pagos;
