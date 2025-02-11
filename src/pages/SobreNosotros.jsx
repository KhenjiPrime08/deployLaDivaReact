import React from 'react'
import otros from '../assets/images/otros/otros'

function SobreNosotros() {
  return (
    <section>
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
      </section>

      <section className='profesionales'>
        <article className='lorena'>
          <img src={otros.lorena} alt="Foto Lorenaur encargada de gemas dentales" />

          <h2>@Lorenaur</h2>

          <p>
              Responsable de coordinar al equipo y gestionar las citas,
             asegurando un proceso fluido y personalizado desde el inicio hasta la finalización.
             Además de ser la responsable en ayudarte y asesorarte en tu elección y colocación de joyas dentales 
          </p>
        </article>


        <article className='yani'>
          <img src={otros.yani} alt="Foto InkYaque tatuadora y dueña del estudio" />

          <h2>@InkYaque</h2>

          <p>
            Artista y fundadora de Diva Tattoo, especializada en
            <b>tatuajes a color, fine line, neotradicional, full color y acuarela.</b> 
            Su creatividad y técnica dan vida a diseños únicos llenos de personalidad y estilo.
          </p>
        </article>

        <article className='alex'>
          <img src={otros.alex} alt="Foto Toto_Tattoo artista residente del estudio" />

          <h2>@Toto_Tattoo</h2>

          <p>
            Artista residente en La Diva Tattoo.

            Especializado en estilos únicos como <b>fine line, black work y puntillismo de arrastre</b>.
          </p>

        </article>

        <article className='mara'>
          <img src={otros.mara} alt="Foto McPiercing, anilladora residente del estudio" />

          <h2>@McPiercing</h2>

          <p>
            Anilladora que cuenta con más de 7 años de experiencia en el arte de la perforación corporal.
          </p>

          <p>
            Especialista en el uso de técnicas precisas como el <b>Perforado con Aguja Americana</b>,
            trabaja exclusivamente con joyería de titanio, asegurando calidad, estilo y cuidado para tu piel.
          </p>

        </article>
      </section>


    </section>
  )
}

export default SobreNosotros