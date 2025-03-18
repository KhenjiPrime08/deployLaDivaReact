const db = require("../config/db");

exports.crearCita = async (req, res) => {
    const { servicio, fecha, hora } = req.body;
    const usuario_id = req.user.id;  

    // Comprobar si la hora ya está ocupada
    const [existeCita] = await db.query(
        "SELECT * FROM citas WHERE fecha = ? AND hora = ? AND estado = 'confirmada'",
        [fecha, hora]
    );

    if (existeCita) {
        return res.status(400).json({ message: "Ese horario ya está ocupado" });
    }

    //Comprueba el servicio.

    if (!["tatuaje", "piercing", "gema_dental"].includes(servicio)) {
        return res.status(400).json({ message: "Servicio no válido" });
    }

    //Inserta en la bdd
    try {
        await db.query(
            "INSERT INTO citas (usuario_id, servicio, fecha, hora) VALUES (?, ?, ?, ?)",
            [usuario_id, servicio, fecha, hora]
        );

        res.status(201).json({ message: "Cita creada con éxito" });
    } catch (error) {
        res.status(500).json({ message: "Error al crear la cita" });
    }
};


exports.obtenerCitas = async (req, res) => {
    const usuario_id = req.user.id;

    try {
        const citas = await db.query("SELECT * FROM citas WHERE usuario_id = ?", [usuario_id]);
        res.json(citas);
    } catch (error) {
        res.status(500).json({ message: "Error al obtener citas" });
    }
};

exports.actualizarCita = async (req, res) => {
    const { id } = req.params;
    const { fecha, hora } = req.body;
    const usuario_id = req.user.id;

    try {
        // Verificar si la cita pertenece al usuario
        const [cita] = await db.query("SELECT * FROM citas WHERE id = ? AND usuario_id = ?", [id, usuario_id]);
        if (!cita) return res.status(404).json({ message: "Cita no encontrada" });

        // Verificar si la nueva fecha y hora están disponibles
        const [existeCita] = await db.query("SELECT * FROM citas WHERE fecha = ? AND hora = ? AND estado = 'confirmada'", [fecha, hora]);
        if (existeCita) return res.status(400).json({ message: "Ese horario ya está ocupado" });

        // Actualizar cita
        await db.query("UPDATE citas SET fecha = ?, hora = ? WHERE id = ?", [fecha, hora, id]);

        res.json({ message: "Cita actualizada exitosamente" });
    } catch (error) {
        res.status(500).json({ message: "Error al actualizar cita" });
    }
};


exports.cancelarCita = async (req, res) => {
    const { id } = req.params;
    const usuario_id = req.user.id;

    try {
        // Verificar si la cita pertenece al usuario
        const [cita] = await db.query("SELECT * FROM citas WHERE id = ? AND usuario_id = ?", [id, usuario_id]);
        if (!cita) return res.status(404).json({ message: "Cita no encontrada" });

        // Marcar como cancelada
        await db.query("UPDATE citas SET estado = 'cancelada' WHERE id = ?", [id]);

        res.json({ message: "Cita cancelada exitosamente" });
    } catch (error) {
        res.status(500).json({ message: "Error al cancelar cita" });
    }
};
