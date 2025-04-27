const Usuario = require("./Usuario");
const Cita = require("./Cita");
const CitaConfirmada = require("./CitaConfirmada");
const Pagos = require("./Pagos");

// RELACIONES

// Relación Usuario -> Cita
Usuario.hasMany(Cita, { foreignKey: "usuarioId" });
Cita.belongsTo(Usuario, { foreignKey: "usuarioId" });

// Relación Cita -> CitaConfirmada
Cita.hasOne(CitaConfirmada, { foreignKey: "citaId" });
CitaConfirmada.belongsTo(Cita, { foreignKey: "citaId" });

// Relación Usuario -> CitaConfirmada (cliente de la cita confirmada)
Usuario.hasMany(CitaConfirmada, { foreignKey: "usuarioIdCita" });
CitaConfirmada.belongsTo(Usuario, { foreignKey: "usuarioIdCita" });

// Relación Usuario -> Pagos
Usuario.hasMany(Pagos, { foreignKey: "usuarioId" });
Pagos.belongsTo(Usuario, { foreignKey: "usuarioId" });

// Relación Cita -> Pagos
Cita.hasOne(Pagos, { foreignKey: "citaId" });
Pagos.belongsTo(Cita, { foreignKey: "citaId" });



module.exports = { Usuario, Cita, CitaConfirmada, Pagos };