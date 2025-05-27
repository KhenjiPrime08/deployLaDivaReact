import React, { useState } from 'react'
import Formulario from '../components/Formulario'
import { crearCita } from '../services/citaService';


function CitaPiercing() {

  const [formData, setFormData] = useState({ piercing: "", fecha: "", notas: "",  terminos:"" });
  const [mensaje, setMensaje] = useState("");
  const [ textoInicial, setTextoInicial] = useState("");


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
    { nombre: "terminos", label: "He leido y acepto los terminos y condiciones", type: "checkbox", required: true }
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
      campos={fields}
      formData={formData}
      setFormData={setFormData}
      onSubmit={handleSubmit}
      buttonText="Reservar Cita"
      mensaje={textoInicial}
    />
  )
}

export default CitaPiercing