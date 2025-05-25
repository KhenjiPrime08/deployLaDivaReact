const Cita = require("../model/Cita");
const CitaConfirmada = require("../model/CitaConfirmada");


exports.solicitarCita = async (req, res) => {
  const { fecha, servicio, diseno, usuarioId, observaciones, archivo } = req.body; //Pillamos los datos del body

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

    return res.status(201).json(cita);
  } catch (error) {
    return res.status(500).json({ error: "Error creando la cita" });
    
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

exports.getAllCitas = async (req, res) => {

  try{
    const citas = await Cita.findAll()

    if (!citas.length) return res.status(404).json({ error: "No hay citas" });
    res.status(200).json(citas);

  }catch (error) {
    console.error("Error obteniendo citas:", error);
    res.status(500).json({ error: "Error al obtener citas" });
  }
}

exports.eliminarCita = async (req, res) => {
  try {
    console.log("GOLAGOALLA")
    const { citaId } = req.params; // ID de la cita a cancelar

    const cita = await Cita.findByPk(citaId);
    if (!cita) return res.status(404).json({ error: "Cita no encontrada" });

    // Elimina la cita de la bdd
    await Cita.destroy(cita);

    res.status(200).json({ message: "Cita eliminada correctamente" });
  } catch (error) {
    console.error("Error eliminando cita:", error);
    res.status(500).json({ error: "Error al cancelar cita" });
  }
}