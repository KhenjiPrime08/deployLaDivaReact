import React, { useState } from 'react'
import Formulario from '../components/Formulario';
import { Link } from 'react-router-dom';

function Register() {

  const [formData, setFormData] = useState({ nombre:"",email: "", password: "", fechaNac: "" });

  const fields = [
    { nombre: "nombre", label: "Nombre", type: "text", placeholder: "Nombre", required: true },
    { nombre: "email", label: "Correo electrónico", type: "email", placeholder: "Correo", required: true },
    { nombre: "password", label: "Contraseña", type: "password", placeholder: "Contraseña", required: true },
    { nombre: "fechaNac", label: "Fecha de nacimiento", type: "date", placeholder: "dd/mm/aaaa", required: true },
  ];

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log("Datos de registro", formData);
    // agregar la lógica para registrar al usuario
  }

  return (
    <Formulario
      titulo="Registro"
      campos={fields}
      formData={formData}
      setFormData={setFormData}
      onSubmit={handleSubmit}
      buttonText="Iniciar sesión"
      mensaje={<p>¿Ya tienes cuenta? <Link to="/login">Inicia sesión aquí</Link></p>}
      />
  )
}

export default Register