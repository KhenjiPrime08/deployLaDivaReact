import React, { useState } from 'react'
import Formulario from '../components/Formulario'
import { crearCita } from '../services/citaService';


function CitaPiercing() {

  const [formData, setFormData] = useState({ piercing: "", fecha: "", notas: "" });
  const [mensaje, setMensaje] = useState("");
  const [ textoInicial, setTextoInicial] = useState("");


  const fields = [
    { nombre: "fecha", label: "Mejor disponibilidad", type: "text", placeholder: "Indica una fecha ", required: true, },

    {
      nombre: "piercing",
      label: "¿Que piercing quieres?",
      type: "select",
      options: [
        { value: "Oreja", label: "Oreja (Lóbulo, Helix...) - 10 euros de señal" },
        { value: "Cara", label: "Cara (Ceja, Septum...) - 10 euros de señal" },
        { value: "Cuerpo", label: "Cuerpo (Ombligo, Pezón...) - 10 euros de señal" }
      ],
      required: true
    },
    { nombre: "observaciones", label: "Notas (Opcional) ", type: "text", placeholder: "Notas adicionales", required: false, },
  ];

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await crearCita( formData, "piercing"); //Lo mismo, se le pasa el tipo de cita porque siempre va a ser la misma

      if (response.error){
        throw new Error("Ha habido un error al crear la cita.");
      }else {
        setTextoInicial("Cita reservada con éxito, te llegará un correo con la confirmación");
        setFormData({piercing: "", fecha: "", notas: ""}); // Resetear el formulario
      }
    } catch (error) {
      setMensaje(error.message);
    }
  };


  return (
    <Formulario
      titulo="Reserva tu cita para hacerte un piercing"
      textoInicial={textoInicial}
      campos={fields}
      formData={formData}
      setFormData={setFormData}
      onSubmit={handleSubmit}
      buttonText="Reservar Cita"
      mensaje={mensaje}
    />
  )
}

export default CitaPiercing