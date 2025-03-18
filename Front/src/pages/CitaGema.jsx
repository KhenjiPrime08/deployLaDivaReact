import React, { useState } from 'react'
import Formulario from '../components/Formulario';

function CitaGema() {

   const [formData, setFormData] = useState({ nombre: "", email: "", telefono: "", piercing:"", fecha: "", hora: "", notas:""});  
      
      const fields = [
        { nombre: "nombre", label: "Tu nombre", type: "text", placeholder: "Nombre completo", required: true, maxLength: 50 },
        { nombre: "email", label: "Tu Email", type: "email", placeholder: "Correo electrónico", required: true },
        { nombre: "contacto", label: "Número de contacto", type: "tel", placeholder: "Teléfono", required: true, pattern: "^[0-9]{9}$" },
        { nombre: "fecha", label: "Fecha", type: "date", placeholder: "Selecciona una fecha", required: true, min: new Date().toISOString().split("T")[0] }, //Bloquea fechas pasadas
      ];
      
      const handleSubmit = async (e) => {
        e.preventDefault();
        try {
          await crearCita("gema_dental", formData.fecha, formData.hora);
          alert("Cita de gema dental reservada con éxito");
        } catch (error) {
          console.error(error);
          alert("Error al reservar la cita");
        }
      };

      
  return (
    <Formulario 
    titulo="Reserva tu cita para ponerte una gema dental"
    campos={fields}
    formData={formData}
    setFormData={setFormData}
    onSubmit={handleSubmit}
    buttonText="Reservar Cita"
    mensaje="El precio del depósito serán 10€"
    />
  )
}

export default CitaGema