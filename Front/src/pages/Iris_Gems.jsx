import React from 'react'
import gemas from '../assets/images/gemas_dentales/gemas'
import Presentacion from '../components/Presentacion';
import Separador from '../components/Separador';
import GaleriaTatuajes from '../components/GaleriaTatuajes';

function Iris_Gems() {
    const galeria = [
        gemas.gema1,
        gemas.gema2,
        gemas.gema3,
        gemas.gema4,
        gemas.gema5,
        gemas.gema6
    ];

  return (
    <section>
        <Presentacion
        imagen={gemas.gema1}
        titulo={"Iris Gems: Gemas Dentales de Alta Calidad"}
        texto={<article>
            <p>Lorena es el corazón cálido de nuestro estudio. Como recepcionista, se encarga de que todo esté en su lugar,
              creando un ambiente organizado y acogedor para que cada cliente se sienta como en casa desde el momento en que entra.
              Su dedicación y atención al detalle son clave para que la experiencia de cada persona sea perfecta, brindando apoyo constante a nuestros tatuadores
              y asegurándose de que todo transcurra sin problemas. </p>   

            <p>Además, Lorena tiene una habilidad única que ilumina aún más las sonrisas: ¡es especialista en la colocación de gemas dentales! Si deseas darle un toque
              especial a tu sonrisa, ella estará encantada de ayudarte a brillar tanto por dentro como por fuera.</p>
            </article>
        }
        />

        <Separador text={"Galeria de gemas dentales"}/>

        <GaleriaTatuajes images={galeria} />
    </section>
  )
}

export default Iris_Gems