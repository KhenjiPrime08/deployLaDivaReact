const { DataTypes } = require("sequelize");
const db = require("../config/db");

const CitaConfirmada = db.define("CitaConfirmada", {
    id: { type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true },
    citaId: { type: DataTypes.INTEGER, allowNull: false },
    usuarioIdCita: { type: DataTypes.INTEGER, allowNull: false }, //Id del cliente que ha solicitado la cita
    servicio: { type: DataTypes.ENUM("tatuaje", "piercing", "gema_dental"), allowNull: false },
    fechaAsignada: { type: DataTypes.DATEONLY, allowNull: false },
    horaInicio: { type: DataTypes.TIME, allowNull: false }, //Para ajustar la hora perfectamente 
    horaFin: { type: DataTypes.TIME, allowNull: false }, //Para ajustar la hora perfectamente 
    estado: { type: DataTypes.ENUM('pendiente_pago', 'pagada', 'cancelada'), defaultValue: 'pendiente_pago' },
    motivoCancelacion: { type: DataTypes.TEXT, allowNull: true },
    notasAdmin: { type: DataTypes.TEXT },// Para anotar cosas internas
    artista: { type: DataTypes.ENUM('yani', 'alex', 'mara', 'lorena', 'elegir' ), defaultValue: 'elegir' }, //Artista que ha confirmado la cita
  });
  
module.exports = CitaConfirmada;