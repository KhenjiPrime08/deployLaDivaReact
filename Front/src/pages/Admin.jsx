import React, { useContext, useState } from 'react'
import { UserContext } from '../context/userContext'
import { useNavigate } from 'react-router-dom';
import Formulario from '../components/Formulario'
import '../styles/Css/Admin.css'

function Admin() {
  const { isAdmin } = useContext(UserContext);
  const navigate = useNavigate();
  if(!isAdmin){
    navigate('/'); // Redirige al inicio si no es admin
  } 


  //INFO DE GEMAS DENTALES
  const [formDataGemas, setFormDataGemas] = useState({ nombre: "", email: "", telefono: "", piercing:"", fecha: "", hora: "", notas:""});  
      
  const fieldsGemas = [
    { nombre: "nombre", label: "Tu nombre", type: "text", placeholder: "Nombre completo", required: true, maxLength: 50 },
    { nombre: "email", label: "Tu Email", type: "email", placeholder: "Correo electrónico", required: true },
    { nombre: "contacto", label: "Número de contacto", type: "tel", placeholder: "Teléfono", required: true, pattern: "^[0-9]{9}$" },
    { nombre: "fecha", label: "Fecha", type: "date", placeholder: "Selecciona una fecha", required: true, min: new Date().toISOString().split("T")[0] }, //Bloquea fechas pasadas
  ];
  
  const handleSubmitGemas = async (e) => {
    e.preventDefault();
    try {
      await crearCita("gema_dental", formDataGema.fecha, formDataGema.hora);
      alert("Cita de gema dental reservada con éxito");
    } catch (error) {
      console.error(error);
      alert("Error al reservar la cita");
    }
  };


  // INFO CITA TATUAJES

  const [formDataPiercing, setFormDataPiercing] = useState({ nombre: "", email: "", telefono: "", piercing:"", fecha: "", hora: "", notas:""});  
    
  const fieldsPiercing = [
    { nombre: "nombre", label: "Tu nombre", type: "text", placeholder: "Nombre completo", required: true, maxLength: 50 },
    { nombre: "email", label: "Tu Email", type: "email", placeholder: "Correo electrónico", required: true },
    { nombre: "contacto", label: "Número de contacto", type: "tel", placeholder: "Teléfono", required: true, pattern: "^[0-9]{9}$" },
    { nombre: "fecha", label: "Fecha", type: "date", placeholder: "Selecciona una fecha", required: true, min: new Date().toISOString().split("T")[0] }, //Bloquea fechas pasadas

    { nombre: "piercing",
      label: "¿Que piercing quieres?", 
      type: "select", 
      options: [
        {value: "Oreja", label: "Oreja (Lóbulo, Helix...)"},
        {value: "Cara",label:"Cara (Ceja, Septum...)"}, 
        {value: "Cuerpo",label:"Cuerpo (Ombligo, Pezón...)"}
      ], 
      required: true 
    },
  ];

  const handleSubmitPiercing = async (e) => {
    e.preventDefault();
    try {
      await crearCita("piercing", formDataPiercing.fecha, formDataPiercing.hora); //Lo mismo, se le pasa el tipo de cita porque siempre va a ser la misma
      alert("Cita de piercing reservada con éxito");
    } catch (error) {
      console.error(error);
      alert("Error al reservar la cita");
    }
  };



  //INFO CITAS TATUAJES

  const [formDataTattoo, setFormDataTattoo] = useState({ nombre: "", email: "", telefono: "", tatuador:"", fecha: "", hora: "", idea: "", notas:"", archivo:null });  
  
  const fieldsTattoo = [
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
  const handleSubmitTattoo = async (e) => {
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
    <section className="citas-container">
      <h1>TODAS LAS CITAS</h1>

      <section className="citas-grid">

        <article className="cita-card">
          <Formulario
            titulo="Reserva cita Tattoo"
            campos={fieldsTattoo}
            formData={formDataTattoo}
            setFormData={setFormDataTattoo}
            onSubmit={handleSubmitTattoo}
            buttonText="Reservar Cita"
            mensaje="El precio del depósito serán 20€ "
          />
        </article>

        <article className="cita-card">
          <Formulario 
            titulo="Reserva cita Gema dental"
            campos={fieldsGemas}
            formData={formDataGemas}
            setFormData={setFormDataGemas}
            onSubmit={handleSubmitGemas}
            buttonText="Reservar Cita"
          />
        </article>

        
        <article className="cita-card">
          <Formulario 
            titulo="Reserva cita Piercing"
            campos={fieldsPiercing}
            formData={formDataPiercing}
            setFormData={setFormDataPiercing}
            onSubmit={handleSubmitPiercing}
            buttonText="Reservar Cita"
          />
        </article>

      </section>
    </section>
  )
}

export default Admin


      

