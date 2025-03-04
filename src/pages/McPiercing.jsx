import React from 'react'
import Presentacion from '../components/Presentacion'
import Separador from '../components/Separador'
import mara from '../assets/images/piercings/piercings'
import GaleriaTatuajes from '../components/GaleriaTatuajes'

function McPiercing() {

    const galeria = [
        mara.entre_pechos,
        mara.oreja,
        mara.pecho_alto,
        mara.pezon,
        mara.septum,
        mara.septum2
    ];

  return (
    <section>
        <Presentacion 
        imagen={mara.foto_mara}
        titulo={"Mara Corpa: Especialista en Piercing y Anillado Corporal"}
        texto={<article>
            <p>En el mundo del piercing, pocos nombres destacan tanto como el de Mara Corpa. Nacida en Madrid, su pasión por el arte
            del anillado corporal viene prácticamente de cuna. Creció en una familia profundamente ligada al mundo del tatuaje y 
            el piercing, lo que le permitió, desde niña, vivir de cerca este estilo de vida. Durante su infancia, tuvo la oportunidad 
            de viajar por toda España visitando convenciones, donde absorbió conocimientos y experiencias que más tarde darían forma a 
            su carrera.</p>
          
            <p>Aunque en su adolescencia decidió formarse como Técnico Superior en Estética, especializándose en Micropigmentación, 
                Mara siempre supo que su verdadera vocación era el piercing. Así, una vez que logró la independencia económica necesaria, 
                se volcó de lleno en su sueño. Asistió a numerosos seminarios y cursos especializados, perfeccionando su técnica y profundizando 
                en las mejores prácticas del sector.</p> 

            <p>Desde entonces, Mara se ha dedicado exclusivamente al anillado corporal, convirtiéndose en una defensora de la seguridad y
                la calidad. Hace especial hincapié en el uso de joyería de titanio de grado implante y en la técnica de aguja americana,
                garantizando así una experiencia profesional, segura y respetuosa con el cuerpo.</p>

            <p>
            Si buscas un piercing realizado con pasión, precisión y materiales de la más alta calidad, Mara Corpa es la profesional ideal. 
            ¡Ven a conocerla y descubre cómo transformar una idea en una obra de arte corporal!
            </p>
          
          </article>   
        }
        />

        <Separador text={"Galeria de piercings"}/>

        <GaleriaTatuajes images={galeria} />
    </section>
  )
}

export default McPiercing