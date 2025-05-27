import React, { useState } from 'react'
import Formulario from '../components/Formulario'
import { crearCita } from '../services/citaService';
import ModalTerminos from '../components/TerminosyCondiciones';



function CitaTattoo() {

  const [nuevoFormData, setNuevoFormData] = useState({ fecha: "", diseno: "", archivo:"", servicio: "tatuaje", observaciones:"", terminos:"" }); 
  const [errors, setErrors] = useState({});
  const [textoInicial, setTextoInicial] = useState("");
  const [ showModal, setShowModal] = useState(false);
  
  
  const fields = [
    { nombre: "fecha",
      label: "Mejor disponibilidad",
      type: "select",
        options: [
          { value: "lunes", label: "Lunes" },
          { value: "martes", label: "Martes" },
          { value: "miercoles", label: "Miércoles" },
          { value: "jueves", label: "Jueves" },
          { value: "viernes", label: "Viernes" },
          { value: "sabado", label: "Sábado" }
        ],
      placeholder: "Selecciona una fecha", required: true
    },
    { nombre: "tramoHorario",
      label: "Tramo horario",
      type: "select",
      options: [
        { value: "mañana", label: "Mañana" },
        { value: "tarde", label: "Tarde" }
      ],
      placeholder: "Selecciona un tramo horario", required: true
    }, 
    { nombre: "diseno", label: "¿Qué te quieres tatuar?", type: "textarea", placeholder: "Describe tu diseño", required: true },
    { nombre: "observaciones", label: "Notas (Opcional)", type: "textarea", placeholder: "Notas adicionales", required: false },
    { nombre: "archivo", label: "Pon tu diseño (Opcional)", type: "file", required: false },
    { nombre: "terminos", label: "He leido y acepto los terminos y condiciones", type: "checkbox", required: true }
  ];
  

  //VALIDACIONES, Esta funcion solo comprueba si esta todo bien y se pudiera crear un formulario
  const handleSubmit = async (e) => {
    e.preventDefault();
  
    let validationErrors = {};
  
    const { fecha, diseno, observaciones, archivo } = nuevoFormData;
  
    // Validaciones
    if (!fecha) {
      validationErrors.fecha = "La fecha es obligatoria";
    }
    if (!diseno.trim()) {
      validationErrors.diseno = "El diseño es obligatorio";
    }
  
    if (archivo && archivo.size > 5 * 1024 * 1024) { // Limitar a 5MB
      validationErrors.archivo = "El archivo es demasiado grande. Máximo 5MB.";
    }
    if (observaciones && observaciones.length > 500) { // Limitar a 500 caracteres
      validationErrors.notas = "Las notas son demasiado largas. Máximo 500 caracteres.";
    }
  
    if (Object.keys(validationErrors).length > 0) {
      setErrors(validationErrors);
      return false;
    }
  
    try {
      // Si hay un archivo, subirlo a Cloudinary
      if (archivo) {
        const data = new FormData();
        data.append("file", archivo); // Aquí se agrega el archivo
        data.append("upload_preset", "tatuajes_upload");
  
        const res = await fetch("https://api.cloudinary.com/v1_1/dqmbt7gvm/image/upload", {
          method: "POST",
          body: data,
        });
  
        const file = await res.json();
        
        // Guardamos la URL en el estado
        const urlFoto = file.secure_url;
  
        // Actualizamos nuevoFormData con la URL de la imagen 
        const updatedFormData = { ...nuevoFormData, archivo: urlFoto }; // Usamos la URL en lugar del archivo
  
        // Ahora enviamos los datos al servidor
        const subirCitaTattoo = await crearCita(updatedFormData, "tatuaje");
  
        if (subirCitaTattoo.error) {
          setErrors({ general: subirCitaTattoo.error });
        } else {
          setErrors({}); // Limpiar errores si la cita se creó correctamente
          setTextoInicial("Cita de tatuaje reservada con éxito, te llegará un correo con la confirmación");
          setNuevoFormData({ fecha: "", diseno: "", archivo: null, servicio: "tatuaje", observaciones: "", terminos: false }); // Resetear el formulario
        }

      } else {
        // Si no hay archivo, simplemente enviar el formData sin cambios
        const subirCitaTattoo = await crearCita(nuevoFormData, "tatuaje");
  
        if (subirCitaTattoo.error) {
          setErrors({ general: subirCitaTattoo.error });
        } else {
          setErrors({}); // Limpiar errores si la cita se creó correctamente
          setTextoInicial("Cita de tatuaje reservada con éxito, te llegará un correo con la confirmación");
          setNuevoFormData({ fecha: "", diseno: "", archivo: null, servicio: "tatuaje", observaciones: "", terminos: false }); // Resetear el formulario
        }
      }
    } catch (error) {
      console.error("Error al crear la cita:", error);
      setErrors({ general: "Error al crear la cita. Inténtalo de nuevo." });
    }
  };
  

  return (
    <section>
      <Formulario
        titulo="Reserva tu cita para tatuarte"
        campos={fields}
        formData={nuevoFormData}
        setFormData={setNuevoFormData}
        onSubmit={handleSubmit}
        buttonText="Reservar Cita"
        mensaje={textoInicial}
        errors={errors} // Pasar los errores al formulario
        setShowModal={setShowModal}
      />
      {
        showModal && (
          <ModalTerminos show={showModal} onClose = {() => setShowModal(false)} />
        )
      }
      
    </section>
    
  )
}

export default CitaTattoo