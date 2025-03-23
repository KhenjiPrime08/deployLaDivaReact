import React, { useState } from 'react'
import Formulario from '../components/Formulario';
import { Link, useNavigate } from 'react-router-dom';
import { loginUser } from '../services/userService';



function Login() {

  const [formData, setFormData] = useState({ email: "", password: "" });
  const [errors, setErrors] = useState({});  
  const navigate = useNavigate();


  const fields = [
    { nombre: "email", label: "Correo electrónico", type: "email", placeholder: "Correo", required: false },
    { nombre: "password", label: "Contraseña", type: "password", placeholder: "Contraseña", required: false }
  ];

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    const email = formData.email;
    const password = formData.password;

    //Validaciones
    let validationErrors = {};
    if (!email) validationErrors.email = "El correo es obligatorio";

    if (!email.match(/^[^\s@]+@[^\s@]+\.[^\s@]+$/)) {
      validationErrors.email = "Correo inválido";
    }

    if (!password) validationErrors.password = "La contraseña es obligatoria";

    if (Object.keys(validationErrors).length > 0) {
      setErrors(validationErrors);  // Guardar errores en el estado
      return;
    }

    try {
      await loginUser(email, password);

      navigate("/"); //los lleva al home
    }catch(error){
      console.error(error);
      
      // Mostrar el error del backend en el front
      setErrors({ general: error.message || "Error al iniciar sesión" });
    }
  }

  return (
      <Formulario
      titulo="Iniciar sesión"
      campos={fields}
      formData={formData}
      setFormData={setFormData}
      onSubmit={handleSubmit}
      buttonText="Iniciar sesión"
      mensaje={<p>¿No tienes cuenta? <Link to="/register">Regístrate aquí</Link></p>}
      errors={errors}
      /> 
   
    
  )

}

export default Login