import React, { useContext } from 'react'
import otros from '../assets/images/otros/otros'
import { DarkModeContext } from '../context/DarkModeContext';
import '../styles/Css/SobreNosotros.css'
import { Link } from 'react-router-dom';

function SobreNosotros() {

  const { darkMode } = useContext(DarkModeContext);

  return (
    <section className={`sobre-nosotros ${darkMode ? 'dark-mode' : ''}`}>
      <section className='intro'>
        <h1>Sobre Nosotros</h1>

        <p>
          En La Diva Tattoo, llevamos tus ideas a otro nivel, transformándolas en arte personalizado que llevará tu estilo y esencia para siempre.
          Nuestro estudio es más que un lugar para tatuarte; es un espacio donde la creatividad, la calidad y
          la atención al detalle se unen para ofrecerte una experiencia única.
        </p>

        <p>
        Además de nuestros diseños exclusivos en tatuajes, ponemos a tu disposición una amplia variedad de servicios,
        como piercings, micropigmentación y gemas dentales. Cada uno de ellos está pensado para resaltar tu personalidad
        y ayudarte a expresar quién eres, con total confianza y seguridad.
        </p>

        <h1>Conoce a nuestro equipo</h1>
      </section>

      <section className='profesionales'>
        <article>
          <Link to="/irisGems">
            <img src={otros.lorena} alt="Foto Lorenaur encargada de gemas dentales" />

            <h2>@I_iris_gems</h2>

            <p>
                Responsable de coordinar al equipo y gestionar las citas,
              asegurando un proceso fluido y personalizado desde el inicio hasta la finalización.
              Además de ser la responsable en ayudarte y asesorarte en tu elección y aplicación de joyas dentales 
            </p>
          </Link>
        </article>


        <article>
          <Link to="/inkYaque">
            <img src={otros.yani} alt="Foto InkYaque tatuadora y dueña del estudio" />

            <h2>@InkYaque</h2>

            <p>
              Artista y fundadora de Diva Tattoo, especializada en
              <b>tatuajes a color, fine line, neotradicional, full color y acuarela.</b> 
              Su creatividad y técnica dan vida a diseños únicos llenos de personalidad y estilo.
            </p>
          </Link>
        </article>

        <article className='alex'>

          <Link to="/totoTattoo">
            <img src={otros.alex} alt="Foto Toto_Tattoo artista residente del estudio" />

            <h2>@Toto_Tattoo</h2>

            <p>
              Artista residente en La Diva Tattoo.

              Especializado en estilos únicos como <b>fine line, black work y puntillismo de arrastre</b>.
            </p>
          </Link>
        </article>

        <article className='mara'>
          <Link to="/McPiercing">
            <img src={otros.mara} alt="Foto McPiercing, anilladora residente del estudio" />

            <h2>@McPiercing</h2>

            <p>
              Anilladora que cuenta con más de 7 años de experiencia en el arte de la perforación corporal.
            <br />
              Especialista en el uso de técnicas precisas como el <b>Perforado con Aguja Americana</b>,
              trabaja exclusivamente con joyería de titanio, asegurando calidad, estilo y cuidado para tu piel.
            </p>
          </Link>

        </article>
      </section>

      <section className='mapa-container'>
        <h1>Donde encontrarnos</h1>

        <iframe 
          src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3492.2880464341315!2d-13.655655788466813!3d28.919497470888555!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0xc4625a28e818ac9%3A0x33ef7b57811c8382!2sLa%20Diva%20tattoo!5e0!3m2!1ses!2ses!4v1739970088323!5m2!1ses!2ses" 
          loading="lazy" 
          referrerPolicy="no-referrer-when-downgrade">
        </iframe>
        
      </section>

    </section>
  )
}

export default SobreNosotros