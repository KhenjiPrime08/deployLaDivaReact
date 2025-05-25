
import API_URL from "../config/config";
import { jwtDecode } from "jwt-decode";


export const crearCita = async (nuevoFormData, servicio) => {

  //PARA TATTOO
  const fecha = nuevoFormData.fecha;
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
  
    console.log(res)
    const data = await res.json();
    
  
    if (data.error) {
      throw new Error(data.error); // Si hay error, lo lanzamos
    }
  
    return data; // Si no hay error, devolvemos la cita cancelada
  } catch (err) {
    throw new Error("No se pudo eliminar la cita.");
  }
}

// DOCUMENTACIÓN TFG


// 3. Introducción, expectativas/objetivos y antecedentes

// La idea de creación del proyecto se originó por la idea de que un familiar fuese ayudado teniendo su propia página web, en un principió se pensó en realizar una pagina simple con un ligero backend pero resultó ser diferente ya que el proyecto debió amoldarse a las necesidades del establecimiento.

// La idea principal era hacer un par de páginas con información sobre el estudio de tatuajes, un login, register y una página de contacto, pero terminó teniendo un servicio de agendación de citas para tatuarse o bien hacerse un piercing, en el que está involucrado tanto el cliente como el administrador de la página ya que es este el que debe agenciar las citas según les convenga por agenda.

// Se ha investigado sobre otras páginas de otros estudios y se ha intentado mejorar los fallos encontrados en otras páginas como por ejemplo la libertad que da el que el administrador sea el que agencie la cita según convenga, la libertad que te da recibir el pago del depósito del cliente para asegurarte una cita y no perder el tiempo. 
// También se ha mejorado la subida de archivos ya que las otras páginas o no tienen para guardar imágenes o las guardan en local, saturando y llenando el servidor, en cambio en el proyecto se suben las imágenes a una pagina web la cual las guarda y así no se sobrecarga el servidor propio del proyecto.

// 4. Descripción

// - Register: El cliente se registra introduciendo unos datos personales como el nombre, teléfono de contacto, etc... Una vez realizado el registro, se le envía un correo electrónico al usuario con un código de autenticación, el usuario es llevado a la pagina de confirmación la cual se encuentra un formulario en el que se debe introducir el correo electrónico del usuario y el correspondiente código que se le ha mandado.  

// - Petición de cita para tatuar / hacer piercing : La página consta de un formulario en el que el usuario debe introducir datos como, la mejor disponibilidad que tiene para realizar el servicio pedido, en caso de tatuaje, que se quiere tatuar, en caso de piercing aparece un desplegable con la zona del cuerpo en la que se puede realizar el piercing y los nombre de los piercing correspondientes, un apartado de notas por si tienen algo que opcional que indicar, en el caso de los tatuajes también se debe incluir una imagen del diseño que se quiera realizar el cliente y por ultimo un apartado con un checkbox en el que el cliente debe aceptar los términos y condiciones con un pequeño botón que si es pulsado, se muestran los términos y condiciones, una vez enviado el formulario, se muestra un mensaje de error si hay algún error o por contra un mensaje de éxito si hay éxito al enviar el formulario.

// - Recepción de la cita y confimación de la misma: El administrador cuenta con páginas distintas a las del cliente normal, una de ellas es la página de las citas pendientes, en la que va a encontrar en un lado, las citas pendientes por aceptar, en el centro de la pagina un calendario para que tenga accesibilidad para agenciar citas con rapidez y en el otro lado las citas asignadas. Cuando un cliente manda una petición de cita le llega al administrador, este puede ver el 