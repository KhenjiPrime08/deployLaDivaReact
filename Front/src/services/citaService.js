
import API_URL from "../config/config";
import { jwtDecode } from "jwt-decode";


export const crearCita = async (nuevoFormData, servicio) => {

  //PARA TATTOO
  const fecha = nuevoFormData.fecha;
  const tramoHorario = nuevoFormData.tramoHorario; 
  let diseno = nuevoFormData.diseno; //let porque va a cambiar de valor dependiendo de la cita
  const observaciones = nuevoFormData.observaciones;
  const archivo = nuevoFormData.archivo;

  //PARA PIERCING
  const piercing = nuevoFormData.piercing

  if(diseno === undefined){
    diseno = piercing
  }



  //PARA TODO
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
        tramoHorario,
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



export const eliminarCita = async(idCita, token) => {
  try {

    const res = await fetch(`${API_URL}/citas/eliminar/${idCita}`, {
      method: "DELETE",
      headers: {
        "Content-Type": "application/json",
        Authorization: token,
      }
    });
  
    const data = await res.json();
    
  
    if (data.error) {
      throw new Error(data.error); // Si hay error, lo lanzamos
    }
  
    return data; // Si no hay error, devolvemos la cita cancelada
  } catch (err) {
    throw new Error("No se pudo eliminar la cita.");
  }
}