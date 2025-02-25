import React from 'react'
import Presentacion from '../components/Presentacion';
import otros from '../assets/images/otros/otros';
import Separador from '../components/Separador';
import GaleriaTatuajes from '../components/GaleriaTatuajes';
import alex from '../assets/images/tattoos_Alex/alex';

function TotoTattoo() {

    const galeria = [
        alex.buho,
        alex.calavera,
        alex.mano,
        alex.memento,
        alex.paisaje,
        alex.runa,
        alex.zeus
    ];

  return (
    <section>
        <Presentacion
        imagen={otros.alex_tatuando}
        titulo={"Toto Tattoo, un artista del tatuaje apasionado y experto en estilos de color"}
        texto={<article>
            <p>En muchas ocasiones, hacerse un tatuaje es un momento trascendental en la vida, y en ese instante especial,
            es fundamental contar con un profesional que entienda la importancia de transformar ideas en arte permanente.</p>
          
            <p>Mi nombre es Alejandro, aunque en el mundo del tatuaje soy mejor conocido como Toto Tattoo. Mi trayectoria comenzó en 2018, cuando el destino me llevó a 
            descubrir mi verdadera vocación: el tatuaje. Desde niño, siempre me sentí atraído por el arte, disfrutando de dibujar,
            pintar e ilustrar. Sin embargo, no fue hasta años después, trabajando como mánager en un estudio de tatuajes, que redescubrí mi pasión por la creación artística.</p> 

            <p>Con esfuerzo, dedicación y el apoyo de mis seres queridos, adquirí mi primera máquina de tatuar, dando inicio a una carrera que me llena de orgullo.
            Hoy, tengo el privilegio de tatuar a diario en mi propio estudio, La Diva Tattoo, donde me especializo en estilos vibrantes como acuarela, 
            full color, anime y neo tradicional, siempre explorando el fascinante mundo del color.</p>
          
          </article>   
        }
        />

        <Separador text={"Galeria de tatuajes"}/>

        <GaleriaTatuajes images={galeria} />
    </section> 
  )
}

export default TotoTattoo