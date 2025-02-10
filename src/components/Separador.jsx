import React from 'react'
import '../styles/Css/Separador.css'

function Separador({ text, darkmode }) {
  
  return (
    <section className={`separacion ${darkmode ? "dark" : ""}`}>
        <h2>{text}</h2>
    </section>
  )
}

export default Separador