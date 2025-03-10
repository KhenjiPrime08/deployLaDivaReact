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
            <p>Las gemas dentales son una tendencia en auge en el mundo de la estética dental. Cada vez más personas buscan darle un toque
            único y personal a su sonrisa, y las gemas dentales son una excelente opción para lograrlo. En este contexto, Iris Gems se
            presenta como una de las marcas más destacadas en el mercado, ofreciendo gemas de alta calidad y una amplia variedad de diseños.</p>   

            <p>Las gemas dentales de Iris Gems están fabricadas con materiales de primera calidad, lo que garantiza su durabilidad y resistencia.
            Además, su amplio catálogo de diseños permite a cada persona encontrar la gema perfecta para su sonrisa. Desde gemas de colores
            vibrantes hasta diseños más sutiles y elegantes, Iris Gems tiene opciones para todos los gustos y estilos.</p>
            </article>
        }
        />

        <Separador text={"Galeria de gemas dentales"}/>

        <GaleriaTatuajes images={galeria} />
    </section>
  )
}

export default Iris_Gems