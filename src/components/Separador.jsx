import React from 'react'
import '../styles/Css/Separador.css'

function Separador({ text, darkMode }) {
  
  return (
    <section className={`separacion ${darkMode ? "dark-mode" : ""}`}>
        <h2>{text}</h2>
    </section>
  )
}

export default Separador