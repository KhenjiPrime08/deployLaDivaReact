
import API_URL from "../config/config";
import { jwtDecode } from "jwt-decode";


export const crearCita = async (nuevoFormData, servicio) => {

  const fecha = nuevoFormData.fecha;
  const diseno = nuevoFormData.diseno;
  const observaciones = nuevoFormData.observaciones;
  const archivo = nuevoFormData.archivo;
 
  const token = localStorage.getItem("token");
  const decodedToken = jwtDecode(token);
  const usuarioId = decodedToken.id; // ID del usuario que solicita la cita
 
  if (!fecha || !diseno ) {
    return { error: "La fecha y el diseño son obligatorios." };
  }

  try {
    const res = await fetch(`${API_URL}/citas/crear-cita`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: token,
      },
      body: JSON.stringify({
        fecha,
        servicio,
        diseno,
        usuarioId, // ID del usuario que solicita la cita
        observaciones,
        archivo
      }),
    });

    const data = await res.json();

    if (data.error) {
      throw new Error(data.error); // Si hay error, lo lanzamos
    }
    //SI no hay error, mandar correo llamar a la funcion del admin para que compruebe si puede pillar la cita.


    return data; // Si no hay error, devolvemos la cita creada
  }catch (error) {
    throw new Error("No se pudo crear la cita.");
  }

};

export const getAllCitas = async (token) => {
  try {
    const res = await fetch(`${API_URL}/citas/`, {
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
};



export const getCitas = async (usuarioId, token) => {
  try {
    const res = await fetch(`${API_URL}/citas/${usuarioId}`, {
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
};



