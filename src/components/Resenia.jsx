import React from 'react'
import '../styles/Css/Resenia.css'

function Resenia({nombre, cuerpo}) {
  return (
    <article className='reseña'>
        <h2>{nombre}</h2>
        <p>{cuerpo}</p>
    </article>
  )
}

export default Resenia