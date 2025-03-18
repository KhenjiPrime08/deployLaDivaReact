import React, { useState } from 'react'
import Formulario from '../components/Formulario'
import { crearCita } from '../services/citaService';

function CitaTattoo() {

  const [formData, setFormData] = useState({ nombre: "", email: "", telefono: "", tatuador:"", fecha: "", hora: "", idea: "", notas:"", archivo:null });  
  
  const fields = [
    { nombre: "nombre", label: "Tu nombre", type: "text", placeholder: "Nombre completo", required: true, maxLength: 50 },
    { nombre: "email", label: "Tu Email", type: "email", placeholder: "Correo electrónico", required: true },
    { nombre: "contacto", label: "Número de contacto", type: "tel", placeholder: "Teléfono", required: true, pattern: "^[0-9]{9}$" },
    { nombre: "fecha", label: "Fecha", type: "date", placeholder: "Selecciona una fecha", required: true, min: new Date().toISOString().split("T")[0] }, //Bloquea fechas pasadas
    { nombre: "tatuador", label: "Tatuador", type: "select", options: [{value: "InkYaque", label: "InkYaque"},{value: "Toto_Tattoo",label:"Toto_tattoo"}], required: true },
    { nombre: "hora", label: "Horas Disponibles", type: "time", placeholder: "--:--", required: true },
    { nombre: "diseno", label: "¿Qué te quieres tatuar?", type: "textarea", placeholder: "Describe tu diseño", required: true },
    { nombre: "notas", label: "Notas (Opcional)", type: "textarea", placeholder: "Notas adicionales", required: false },
    { nombre: "archivo", label: "Pon tu idea de diseño (Opcional)", type: "file", required: false }
  ];
  
  //Meter el método de pago 
  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await crearCita("tatuaje", formData.fecha, formData.hora); //le indico tatuaje por que SIEMPRE va a ser una cita de tatuajes en esta pagina
      alert("Cita de tatuaje reservada con éxito");
    } catch (error) {
      console.error(error);
      alert("Error al reservar la cita");
    }
  };

  return (
    <Formulario
      titulo="Reserva tu cita para tatuarte"
      campos={fields}
      formData={formData}
      setFormData={setFormData}
      onSubmit={handleSubmit}
      buttonText="Reservar Cita"
      mensaje="El precio del depósito serán 20€ "
    />
  )
}

export default CitaTattoo