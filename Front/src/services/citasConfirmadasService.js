import API_URL from "../config/config";

export async function confirmarCita(idCita, datos, token) {

    const estado = datos.estado;
    const fechaAsignada = datos.fechaAsignada;
    const horaInicio = datos.horaInicio;
    const horaFin = datos.horaFin;
    const notasAdmin = datos.notasAdmin;
    const artista = datos.artista;
  
    try {
      const response = await fetch(`${API_URL}/citasConfirmadas/asignar/${idCita}`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: token,
        },
        body: JSON.stringify({
          estado,
          fechaAsignada,
          horaInicio,
          horaFin,
          notasAdmin,
          artista,
        })
      });
  
      if (!response.ok) {
        throw new Error("Error al confirmar la cita");
      }
    } catch (error) {
      console.error(error);
      throw error;
    }
}



export async function getAllCitasConfirmadas(token) {
  try {
    const res = await fetch(`${API_URL}/citasConfirmadas/`, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        Authorization: token,
      },
    });
  
    const data = await res.json();
  
    if (data.error ) {
      throw new Error(data.error); // Si hay error, lo lanzamos
    }
  
    return data; // Si no hay error, devolvemos las citas
  } catch (err) {
    throw new Error("No se pudieron cargar las citas.");
  }
}


export async function getAllCitasConfirmadasUser(usuarioIdCita, token) {
  try {
    const res = await fetch(`${API_URL}/citasConfirmadas/${usuarioIdCita}`, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        Authorization: token,
      },
    });
  
    const data = await res.json();

  
    if (data.error ) {
      throw new Error(data.error); // Si hay error, lo lanzamos
    }
  
    return data; // Si no hay error, devolvemos las citas
  } catch (err) {
    throw new Error("No se pudieron cargar las citas.");
  }
}

export async function cancelarCita(idCita, motivoCancelacion, token) {
  try {
    const res = await fetch(`${API_URL}/citasConfirmadas/cancelar/${idCita}`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: token,
      },
      body: JSON.stringify({ motivoCancelacion }),
    });
  
    const data = await res.json();
  
    if (data.error) {
      throw new Error(data.error); // Si hay error, lo lanzamos
    }
  
    return data; // Si no hay error, devolvemos la cita cancelada
  } catch (err) {
    throw new Error("No se pudo cancelar la cita.");
  }
}