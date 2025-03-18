import React, { useContext, useState } from "react";
import { DarkModeContext } from "../context/DarkModeContext";
import MedidorPassword from "./MedidorPassword";
import { Eye, EyeOff } from "lucide-react";
import "../styles/Css/Formulario.css";

function Formulario({ campos, formData, setFormData, onSubmit, buttonText, mensaje, titulo, errors, mostrarMedidorPassword }) {
  const { darkMode } = useContext(DarkModeContext);
  const [showPassword, setShowPassword] = useState(false);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    
    let validationErrors = {};
    campos.forEach((campo) => {
      if (campo.required && !formData[campo.nombre]) {
        validationErrors[campo.nombre] = `${campo.label} es obligatorio`;
      }
    });

    onSubmit(e);
  };

  return (
    <section>
      <form className={`form-container ${darkMode ? "dark-mode" : ""}`} onSubmit={handleSubmit}>
        <h1 className="titulo">{titulo}</h1>
        <section className="fondo">
          {campos.map((campo) => (
            <section className="form-group" key={campo.nombre}>
              <label className="form-label">{campo.label}</label>
              <section className="input-container">

                <input
                  className={`form-input ${errors?.[campo.nombre] ? "input-error" : ""}`}
                  type={
                    campo.type === "password"
                      ? showPassword
                        ? "text"
                        : "password"
                      : campo.type
                  }
                  name={campo.nombre}
                  value={formData[campo.nombre] || ""}
                  onChange={handleChange}
                  placeholder={campo.placeholder}
                  required={campo.required}
                />

                {campo.type === "password" && (
                  <button type="button" className="toggle-password" onClick={() => setShowPassword(!showPassword)}>
                    {showPassword ? <EyeOff /> : <Eye />}
                  </button>
                )}

              </section>

              {campo.nombre === "password" && mostrarMedidorPassword && <MedidorPassword password={formData.password} />}
              {errors?.[campo.nombre] && <p className="error-message">{errors[campo.nombre]}</p>}

            </section>
          ))}
          <input className="form-button" type="submit" value={buttonText} />
        </section>
        <article className="mensaje">{mensaje}</article>
      </form>
    </section>
  );
}

export default Formulario;
