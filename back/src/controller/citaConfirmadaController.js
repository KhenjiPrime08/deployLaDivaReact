const Cita = require("../model/Cita");
const CitaConfirmada = require("../model/CitaConfirmada");
const Usuario = require("../model/Usuario");
const { contactClient } = require("../service/emailService");

exports.obtenerCitasConfirmadas = async (req, res) => {
    try {
      const { usuarioIdCita } = req.params;
  
      const citas = await CitaConfirmada.findAll({
        where: { usuarioIdCita },
        include: [{ model: Cita }, { model: Usuario }],
      });
  
      res.status(200).json(citas);
    } catch (error) {
      console.error("Error obteniendo citas confirmadas:", error);
      res.status(500).json({ error: "Error al obtener citas" });
    }
  };


//Funcion que usa el admin para cambiar la fecha de la cita

exports.asignarCita = async (req, res) => {
  try {
    const { fechaAsignada, horaInicio, horaFin, notasAdmin, artista } = req.body;
    const { citaId } = req.params; // ID de la cita a asignar

    const cita = await Cita.findByPk(citaId);
    if (!cita) return res.status(404).json({ error: "Cita no encontrada" });

    const usuarioIdCita = cita.usuarioId; // ID del usuario que solicitó la cita
    const servicio = cita.servicio
   

    // Actualiza el estado de la cita del cliente
    await cita.update({ estado: "asignada" });

    // Crea la cita confirmada
    const citaConfirmada = await CitaConfirmada.create({
      citaId,
      usuarioIdCita,
      servicio,
      fechaAsignada,
      horaInicio,
      horaFin,
      estado: "pendiente_pago",
      notasAdmin,
      artista
    });

    //Mandar un correo al cliente para informarle de la cita confirmada 
    const usuario = await Usuario.findByPk(usuarioIdCita); // Obtener el usuario que solicitó la cita
    const email = usuario.email; // Obtener el email del usuario
    const nombre = usuario.nombre; // Obtener el nombre del usuario

    if (!usuario || !email) {
      console.error("Usuario o email no encontrado");
      return res.status(404).json({ error: "Usuario no encontrado" });
    }
    
    await contactClient(email, nombre, fechaAsignada, horaInicio, horaFin ); // Enviar el correo al cliente


    res.status(201).json(citaConfirmada);
  } catch (error) {
    console.error("Error asignando cita:", error);
    res.status(500).json({ error: "Error al asignar cita" });
  }
};
  

exports.obtenerAllCitasConfirmadas = async (req, res) => {
  try {

    const citas = await CitaConfirmada.findAll({
      include: [
        {
          model: Cita, // modelo original
          attributes: ['diseno', 'imagenDisenoUrl', 'servicio'], // pillo estos campos del modelo original
          include: [
            {
              model: Usuario, // modelo del cliente
              attributes: ['nombre', 'email', 'telefono'], // pillo estos campos del modelo cliente
            },
          ],
        }
      ]
    });

    res.status(200).json(citas);
  } catch (error) {
    console.error("Error obteniendo todas las citas confirmadas:", error);
    res.status(500).json({ error: "Error al obtener citas" });
  }
};


exports.cancelarCita = async (req, res) => {
  try {
    const { citaId } = req.params; // ID de la cita a cancelar
    const { motivoCancelacion } = req.body; 

    const cita = await CitaConfirmada.findByPk(citaId);
    if (!cita) return res.status(404).json({ error: "Cita no encontrada" });

    // Cambia el estado de la cita a "cancelada" y añade el motivo de cancelación
    await cita.update({ estado: "cancelada", motivoCancelacion: motivoCancelacion });

    res.status(200).json({ message: "Cita cancelada correctamente" });
  } catch (error) {
    console.error("Error cancelando cita:", error);
    res.status(500).json({ error: "Error al cancelar cita" });
  }
}
