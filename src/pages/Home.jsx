import React, { useState, useEffect } from 'react'
import otros from '../assets/images/otros/otros.js'
import '../styles/Css/Home.css'
import Carrusel from '../components/Carrusel.jsx'
import yani from '../assets/images/tattos_Yani/yani.js';
import piercing from '../assets/images/piercings/piercings.js'
import alex from '../assets/images/tattoos_Alex/alex.js'
import { Link } from 'react-router-dom';
import Separador from '../components/Separador.jsx';


function Home() {

  const tattooImages = [
    yani.cara_mano,
    yani.elefante,
    alex.runa
  ];
  
  const piercingImagesList = [
    piercing.entre_pechos,
    piercing.oreja,
    piercing.septum2
  ];

  return (
    <section>

      <section className='info'>
        <article>
          <video src={otros.video}  muted loop className='video' />
        </article>

        <article className='texto'>
          <h1 className='titulo'><b>LA DIVA TATTOO, EL NUEVO ESTUDIO DE TATUAJES EN LANZAROTE QUE MARCARÁ TENDENCIA.</b></h1>

          <p className='parrafo'>
            La Diva Tattoo, en Lanzarote, es un estudio donde transformamos ideas en arte personalizado. 
            Nuestro equipo de tatuadores combina experiencia, técnicas modernas y creatividad para ofrecer tatuajes únicos
            en estilos variados, adaptados a cada cliente.
          </p>

          <p className='parrafo'>
            También ofrecemos servicios como piercings, micropigmentación y gemas dentales, siempre con los más altos
            estándares de calidad y seguridad. En un espacio que une profesionalismo, arte y comodidad, 
            hacemos de cada diseño una historia inolvidable.
          </p>
          
        </article>
      </section>


      <Separador text={"Servicios"}/>


      <section className='muestras' >

        <article className='abajo'>
          <h1>Tatuajes</h1>
          <Carrusel images={tattooImages} />
          <p>Esta es tu oportunidad de convertir tus ideas en arte eterno.
            Dale vida a tu historia sobre tu piel, porque un tatuaje es más que un diseño,
            es un reflejo de quién eres. ¿Te atreves?</p>
          <Link to='/citaTattoo' className='btn'>Pedir cita tatuajes</Link>
        </article>
        
        <article className='abajo'>
          <h1>Piercings</h1>
          <Carrusel images={piercingImagesList} />
          <p>Un piercing es más que un accesorio, es una declaración de estilo y actitud. Esta es tu oportunidad de brillar con algo único y auténtico. ¡Hazlo tuyo!</p>
          <Link to='/citaTattoo' className='btn'>Pedir cita tatuajes</Link>
        </article>
        
        
      </section>

      <section className='reseñas'>
        <h1>Reseñass</h1>
      </section>


    </section>
    
  )
}

export default Home;