import React, { useState } from "react";
import { verifyEmail } from "../services/authService"; // Crea esta función
import Formulario from "../components/Formulario";
import { useNavigate } from "react-router-dom";

function VerificarCorreo() {
  const [message, setMessage] = useState("");
  const [formData, setFormData] = useState({email: "", codigo: ""});
  const [errors, setErrors] = useState({});
  const navigate = useNavigate();

  const fields = [
    { nombre: "email", label: "Correo electrónico", type: "email", placeholder: "Correo", required: false },
    { nombre: "codigo", label: "Código de verificación", type: "password", placeholder: "Código de verificación", required: false },
  ];

  const handleSubmit = async (e) => {
    e.preventDefault();

    let validationErrors = {};

    const email = formData.email;
    const codigo = formData.codigo;

    if(!email.trim()){
      validationErrors.email = "Correo inválido";
    }

    if(!codigo.trim()){
      validationErrors.codigo = "Código inválido";
    }

    if (!email.match(/^[^\s@]+@[^\s@]+\.[^\s@]+$/)) {
      validationErrors.email = "Correo inválido";
    }


    if (Object.keys(validationErrors).length > 0) {
      setErrors(validationErrors);
      return;
    }

    try {
      const response = await verifyEmail(email, codigo);
      setMessage(response.message);
      navigate("/");
    } catch (error) {
      setMessage(error.message);
      console.log("error verificarCorreo", error.message);
    }
  };

  return (
    <section className="verificacion">
      
      <Formulario 
      titulo={"Verifica el correo"}
      campos={fields}
      formData={formData}
      setFormData={setFormData}
      onSubmit={handleSubmit}
      buttonText={"Verificar"}
      mensaje={message}
      errors={errors}
      />
    </section>
  );
}

export default VerificarCorreo;
