const Cita = require("../model/Cita");
const CitaConfirmada = require("../model/CitaConfirmada");


exports.solicitarCita = async (req, res) => {
  const { fecha, servicio, diseno, usuarioId, observaciones, archivo } = req.body; //Pillamos los datos del body

  console.log("Datos recibidos:", req.body); // Verificamos que los datos se reciben correctamente

  try {
    // Creamos la cita en estado pendiente
    const cita = await Cita.create({
      usuarioId,
      fecha, // Aquí guardamos el string con los días disponibles
      servicio,
      diseno,
      imagenDisenoUrl: archivo, // Guardamos la URL de la imagen del diseño
      observaciones,
      archivo,
      estado: "pendiente", // Estado inicial aunque por default es pendiente por si acaso
    });

    console.log("Cita creada:", cita); // Verificamos que la cita se crea correctamente
    return res.status(201).json(cita);
  } catch (error) {
    console.error("Error creando citaAAAAAAAA:", error.message); // Verificamos que no haya errores al crear la cita
    return res.status(500).json({ error: "Error creando la cita" });
    
  }
};

//Funcion de actualizacion que usa el admin para cambiar la fecha de la cita

exports.asignarCita = async (req, res) => {
  try {
    const { citaId, fechaAsignada, horaInicio, notasAdmin } = req.body;

    const cita = await Cita.findByPk(citaId);
    if (!cita) return res.status(404).json({ error: "Cita no encontrada" });

    const usuarioId = cita.usuarioId; // ID del usuario que solicitó la cita

    // Actualiza el estado de la cita del cliente
    await cita.update({ estado: "asignada" });

    // Crea la cita confirmada
    const citaConfirmada = await CitaConfirmada.create({
      citaId,
      usuarioId,
      fechaAsignada,
      horaInicio,
      notasAdmin,
      estado: "pendiente_pago",
    });

    res.status(201).json(citaConfirmada);
  } catch (error) {
    console.error("Error asignando cita:", error);
    res.status(500).json({ error: "Error al asignar cita" });
  }
};

exports.obtenerCitas = async (req, res) => {
  try {
    const { usuarioId } = req.params; // ID del usuario que solicita las citas

    // Obtener todas las citas del usuario
    const citas = await Cita.findAll({
      where: { usuarioId },
      include: [{ model: CitaConfirmada }], // Incluir la cita confirmada si existe
    });

    if (!citas.length) return res.status(404).json({ error: "No hay citas" });

    res.status(200).json(citas);
  }catch (error) {
    console.error("Error obteniendo citas:", error);
    res.status(500).json({ error: "Error al obtener citas" });
  }
}