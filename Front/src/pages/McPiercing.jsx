import React, { useContext, useEffect, useState } from 'react';
import Presentacion from '../components/Presentacion';
import Separador from '../components/Separador';
import mara from '../assets/images/piercings/piercings';
import GaleriaTatuajes from '../components/GaleriaTatuajes';
import { UserContext } from '../context/userContext';
import FormularioAdmin from '../components/FormularioAdmin';
import { uploadImage, fetchImages, deleteImage } from '../services/uploadService';

function McPiercing() {
  const { isAdmin } = useContext(UserContext);
  const categoria = "piercing";

  const [galeria, setGaleria] = useState([]);

  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  // Cargar imágenes desde backend
  useEffect(() => {
    const getImages = async () => {
      try {
        const images = await fetchImages(categoria);
        setGaleria(images);
      } catch (error) {
        console.error("Error al cargar las imágenes:", error);
        setError("No se pudieron cargar las imágenes");
      }
    };
    getImages();
  }, [loading]);

  // Subir nueva imagen
  const handleNewImage = async (file, categoria) => {
    setLoading(true);
    try {
      const imageUrl = await uploadImage(file, categoria);
      setGaleria((prevGaleria) => [...prevGaleria, imageUrl]);
    } catch (error) {
      console.error("Error al subir la imagen:", error);
      setError(error.message);
    } finally {
      setLoading(false);
    }
  };

  // Eliminar imagen
  const handleDeleteImage = async (url) => {
    if (!window.confirm("¿Estás seguro de que quieres eliminar esta imagen?")) return;
  
    try {
      await deleteImage(url);
      setGaleria((prev) => prev.filter((img) => img !== url));
    } catch (error) {
      console.error("Error al eliminar la imagen:", error);
      setError(error.message)
    }
  };

  return (
    <section>
      <Presentacion 
        imagen={mara.foto_mara}
        titulo={"Mara Corpa: Especialista en Piercing y Anillado Corporal"}
        texto={
          <article>
            <p>En el mundo del piercing, pocos nombres destacan tanto como el de Mara Corpa. Nacida en Madrid, su pasión por el arte
              del anillado corporal viene prácticamente de cuna. Creció en una familia profundamente ligada al mundo del tatuaje y 
              el piercing, lo que le permitió, desde niña, vivir de cerca este estilo de vida. Durante su infancia, tuvo la oportunidad 
              de viajar por toda España visitando convenciones, donde absorbió conocimientos y experiencias que más tarde darían forma a 
              su carrera.</p>

            <p>Aunque en su adolescencia decidió formarse como Técnico Superior en Estética, especializándose en Micropigmentación, 
              Mara siempre supo que su verdadera vocación era el piercing. Así, una vez que logró la independencia económica necesaria, 
              se volcó de lleno en su sueño. Asistió a numerosos seminarios y cursos especializados, perfeccionando su técnica y profundizando 
              en las mejores prácticas del sector.</p> 

            {/* <p>Desde entonces, Mara se ha dedicado exclusivamente al anillado corporal, convirtiéndose en una defensora de la seguridad y
              la calidad. Hace especial hincapié en el uso de joyería de titanio de grado implante y en la técnica de aguja americana,
              garantizando así una experiencia profesional, segura y respetuosa con el cuerpo.</p> */}

            <p>
              Si buscas un piercing realizado con pasión, precisión y materiales de la más alta calidad, Mara Corpa es la profesional ideal. 
              ¡Ven a conocerla y descubre cómo transformar una idea en una obra de arte corporal!
            </p>
          </article>
        }
      />

      <Separador text={"Galería de piercings"} />

      <GaleriaTatuajes images={galeria} onDelete={isAdmin ? handleDeleteImage : null}/>

      {isAdmin && (
        <FormularioAdmin
          onSubmit={handleNewImage}
          loading={loading}
          errores={error}
          categoria={categoria}
        />
      )}
    </section>
  );
}

export default McPiercing;
