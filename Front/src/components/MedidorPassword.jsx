import React, { useState, useEffect } from "react";
import "../styles/Css/MedidorPassword.css";

const calcularSeguridadPassword = (password) => {
  let seguridad = 0;
  if (password.length >= 8) seguridad++;
  if (/[a-z]/.test(password)) seguridad++;
  if (/[A-Z]/.test(password)) seguridad++;
  if (/\d/.test(password)) seguridad++;
  if (/[\W]/.test(password)) seguridad++;

  const nivelesSeguridad = [
    { texto: "Muy débil", color: "red", ancho: "20%" },
    { texto: "Débil", color: "orange", ancho: "40%" },
    { texto: "Regular", color: "yellow", ancho: "60%" },
    { texto: "Fuerte", color: "lightblue", ancho: "80%" },
    { texto: "Muy fuerte", color: "green", ancho: "100%" },
  ];

  return nivelesSeguridad[seguridad - 1] || { texto: "", color: "lightgray", ancho: "0%" };
};

function MedidorPassword({ password }) {
  const [seguridad, setSeguridad] = useState({ texto: "", color: "lightgray", ancho: "0%" });

  useEffect(() => {
    setSeguridad(calcularSeguridadPassword(password));
  }, [password]);

  return (
    <div className="medidor-password">
      <div className="barra-seguridad" style={{ backgroundColor: seguridad.color, width: seguridad.ancho }}></div>
      <p className="texto-seguridad">{seguridad.texto}</p>
    </div>
  );
}

export default MedidorPassword;
