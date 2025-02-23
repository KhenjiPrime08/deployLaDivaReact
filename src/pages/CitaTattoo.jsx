import React, { useState } from 'react'
import Formulario from '../components/Formulario'

function CitaTattoo() {

  const [formData, setFormData] = useState({ nombre: "", email: "", telefono: "", tatuador:"", fecha: "", hora: "", idea: "", notas:"", tamaño: "", archivo:null });  
  
  const fields = [
    { nombre: "nombre", label: "Tu nombre", type: "text", placeholder: "Nombre completo", required: true, maxLength: 50 },
    { nombre: "email", label: "Tu Email", type: "email", placeholder: "Correo electrónico", required: true },
    { nombre: "contacto", label: "Número de contacto", type: "tel", placeholder: "Teléfono", required: true, pattern: "^[0-9]{9}$" },
    { nombre: "fecha", label: "Fecha", type: "date", placeholder: "Selecciona una fecha", required: true, min: new Date().toISOString().split("T")[0] }, //Bloquea fechas pasadas
    { nombre: "tatuador", label: "Tatuador", type: "select", options: [{value: "InkYaque", label: "InkYaque"},{value: "Toto_Tattoo",label:"Toto_tattoo"}], required: true },
    { nombre: "hora", label: "Horas Disponibles", type: "time", placeholder: "--:--", required: true },
    { nombre: "diseno", label: "¿Qué te quieres tatuar?", type: "textarea", placeholder: "Describe tu diseño", required: true },
    { nombre: "notas", label: "Notas (Opcional)", type: "textarea", placeholder: "Notas adicionales", required: false },
    { nombre: "tamano", label: "Tamaño del tatuaje", type: "select", options: [{value: "Pequeño",label: "Pequeño (5cm)"},{value: "Mediano",label:"Mediano"},{value: "Grande",label:"Grande"}], required: true },
    { nombre: "archivo", label: "Pon tu idea de diseño (Opcional)", type: "file", required: false }
  ];
  
    const handleSubmit = (e) => {
      e.preventDefault();
      console.log("Datos de login", formData)
      //Faltaria llamar al login context para que haga el login
    }

  return (
    <Formulario
      titulo="Reserva tu cita para tatuarte"
      campos={fields}
      formData={formData}
      setFormData={setFormData}
      onSubmit={handleSubmit}
      buttonText="Reservar Cita"
    />
  )
}

export default CitaTattoo