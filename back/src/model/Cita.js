const { DataTypes } = require("sequelize");
const db = require("../config/db");

//LA CITA QUE RELLENA EL CLIENTE EN EL FORMULARIO DE CITA

const Cita = db.define("Cita", {
  id: { type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true },
  usuarioId: { type: DataTypes.INTEGER, allowNull: false },
  fecha: { type: DataTypes.STRING, allowNull: false }, //Fecha deseada por el cliente
  servicio: { type: DataTypes.ENUM("tatuaje", "piercing", "gema_dental"), allowNull: false },
  diseno: { type: DataTypes.STRING, allowNull: true },
  imagenDisenoUrl: { type: DataTypes.STRING, allowNull: true }, // URL de la imagen del diseño
  estado: { type: DataTypes.ENUM('pendiente', 'rechazada', 'asignada'), defaultValue: 'pendiente' },
  observaciones: { type: DataTypes.TEXT, allowNull:true}, //Notas del cliente
});


module.exports = Cita;
