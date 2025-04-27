const Cita = require("../model/Cita");
const CitaConfirmada = require("../model/CitaConfirmada");
const Usuario = require("../model/Usuario");

// citaConfirmadaController.js
exports.obtenerCitasConfirmadas = async (req, res) => {
    try {
      const { usuarioId } = req.params;
  
      const citas = await CitaConfirmada.findAll({
        where: { usuarioId },
        include: [{ model: Cita }, { model: Usuario }],
      });
  
      res.status(200).json(citas);
    } catch (error) {
      console.error("Error obteniendo citas confirmadas:", error);
      res.status(500).json({ error: "Error al obtener citas" });
    }
  };
  