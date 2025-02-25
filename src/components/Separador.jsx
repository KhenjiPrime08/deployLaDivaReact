import React, { useContext } from 'react'
import '../styles/Css/Separador.css'
import { DarkModeContext } from '../context/DarkModeContext';

function Separador({ text }) {

  const {darkMode} = useContext(DarkModeContext);
  
  return (
    <section className={`separacion ${darkMode ? "dark-mode" : ""}`}>
        <h2>{text}</h2>
    </section>
  )
}

export default Separador