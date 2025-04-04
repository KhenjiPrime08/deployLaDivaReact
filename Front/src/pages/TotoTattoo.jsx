import React, { useContext, useEffect, useState } from 'react';
import Presentacion from '../components/Presentacion';
import otros from '../assets/images/otros/otros';
import Separador from '../components/Separador';
import GaleriaTatuajes from '../components/GaleriaTatuajes';
import { UserContext } from '../context/userContext';
import FormularioAdmin from '../components/FormularioAdmin';
import { uploadImage, fetchImages } from '../services/uploadService';

function TotoTattoo() {
  const { isAdmin } = useContext(UserContext);
  const categoria = "tattooAlex"; 

  const [galeria, setGaleria] = useState([]);

  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  // Cargar imágenes del backend
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

  return (
    <section>
      <Presentacion
        imagen={otros.alex_tatuando}
        titulo={"Toto Tattoo, un artista del tatuaje apasionado y experto en estilos de color"}
        texto={
          <article>
            <p>
              Alejandro nació en Uruguay, donde desde niño descubrió su pasión por el dibujo. Con un talento innato y una curiosidad inagotable,
              pasaba horas perfeccionando sus trazos. Sin embargo, su camino hacia el arte no fue fácil. A lo largo de los años, emprendió viajes
              en busca de oportunidades y nuevos horizontes, persiguiendo un sueño que aún no sabía cómo definir.
            </p>
            <p>
              Todo cambió cuando conoció a un amigo tatuador que le mostró el increíble mundo del arte en la piel.
              Fue en ese momento cuando Alejandro entendió que lo que siempre había buscado estaba allí:
              dar vida a sus dibujos en las pieles de quienes confían en su visión artística.
            </p>
            <p>
              Hoy, Alejandro es tatuador residente en <b>La Diva Tattoo</b>, en la hermosa isla de Lanzarote.
              Especializado en el realismo, cada uno de sus trabajos refleja una dedicación absoluta a los detalles, una técnica impecable
              y la pasión de alguien que convirtió su sueño en realidad.
            </p>
          </article>
        }
      />

      <Separador text={"Galería de tatuajes"} />

      <GaleriaTatuajes images={galeria} />

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

export default TotoTattoo;
