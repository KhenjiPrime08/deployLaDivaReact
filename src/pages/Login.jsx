import React, { useState } from 'react'
import Formulario from '../components/Formulario';

function Login() {

  const [formData, setFormData] = useState({ email: "", password: "" });

  const fields = [
    { nombre: "email", label: "Correo electrónico", type: "email", placeholder: "Correo", required: true },
    { nombre: "password", label: "Contraseña", type: "password", placeholder: "Contraseña", required: true }
  ];

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log("Datos de login", formData)
    //Faltaria llamar al login context para que haga el login
  }

  return (
    <article>
      <Formulario
      campos={fields}
      formData={formData}
      setFormData={setFormData}
      onSubmit={handleSubmit}
      buttonText="Iniciar sesión"
      mensaje="Ya tienes cuenta? inicia sesion aqui"
      />
      
    </article>
    
  )

}

export default Login