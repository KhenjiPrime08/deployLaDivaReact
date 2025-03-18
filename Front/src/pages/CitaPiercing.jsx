import React, { useState } from 'react'
import Formulario from '../components/Formulario'

function CitaPiercing() {

  const [formData, setFormData] = useState({ nombre: "", email: "", telefono: "", piercing:"", fecha: "", hora: "", notas:""});  
    
    const fields = [
      { nombre: "nombre", label: "Tu nombre", type: "text", placeholder: "Nombre completo", required: true, maxLength: 50 },
      { nombre: "email", label: "Tu Email", type: "email", placeholder: "Correo electrónico", required: true },
      { nombre: "contacto", label: "Número de contacto", type: "tel", placeholder: "Teléfono", required: true, pattern: "^[0-9]{9}$" },
      { nombre: "fecha", label: "Fecha", type: "date", placeholder: "Selecciona una fecha", required: true, min: new Date().toISOString().split("T")[0] }, //Bloquea fechas pasadas

      { nombre: "piercing",
        label: "¿Que piercing quieres?", 
        type: "select", 
        options: [
          {value: "Oreja", label: "Oreja (Lóbulo, Helix...) - 20 Euros de señal"},
          {value: "Cara",label:"Cara (Ceja, Septum...) - 30 años de señal"}, 
          {value: "Cuerpo",label:"Cuerpo (Ombligo, Pezón...) - 40 años de señal"}
        ], 
        required: true 
      },
    ];
    
    const handleSubmit = async (e) => {
      e.preventDefault();
      try {
        await crearCita("piercing", formData.fecha, formData.hora); //Lo mismo, se le pasa el tipo de cita porque siempre va a ser la misma
        alert("Cita de piercing reservada con éxito");
      } catch (error) {
        console.error(error);
        alert("Error al reservar la cita");
      }
    };
  

  return (
    <Formulario 
    titulo="Reserva tu cita para hacerte un piercing"
    campos={fields}
    formData={formData}
    setFormData={setFormData}
    onSubmit={handleSubmit}
    buttonText="Reservar Cita"
    mensaje="El precio del depósito serán 10€ "
    />
  )
}

export default CitaPiercing