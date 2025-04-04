import React, { useContext, useEffect, useState } from 'react';
import Presentacion from '../components/Presentacion';
import otros from '../assets/images/otros/otros.js';
import Separador from '../components/Separador.jsx';
import GaleriaTatuajes from '../components/GaleriaTatuajes.jsx';
import { UserContext } from '../context/userContext';
import FormularioAdmin from '../components/FormularioAdmin';
import { uploadImage, fetchImages } from '../services/uploadService';

function InkYaque() {
  const { isAdmin } = useContext(UserContext);
  const categoria = "tattoo";

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
        imagen={otros.yani_tatuando}
        titulo={"InkYaque una artista del tatuaje apasionada y experta en estilos de color"}
        texto={
          <article>
            <p>En muchas ocasiones, hacerse un tatuaje es un momento trascendental en la vida, y en ese instante especial, es fundamental contar con un profesional que entienda la importancia de transformar ideas en arte permanente.</p>
            <p>Mi nombre es Yanire Yaque, aunque en el mundo del tatuaje soy mejor conocida como Inkyaque. Mi trayectoria comenzó en 2018, cuando el destino me llevó a descubrir mi verdadera vocación: el tatuaje. Desde niña, siempre me sentí atraída por el arte, disfrutando de dibujar, pintar e ilustrar. Sin embargo, no fue hasta años después, trabajando como mánager en un estudio de tatuajes, que redescubrí mi pasión por la creación artística.</p>
            <p>Con esfuerzo, dedicación y el apoyo de mis seres queridos, adquirí mi primera máquina de tatuar, dando inicio a una carrera que me llena de orgullo. Hoy, tengo el privilegio de tatuar a diario en mi propio estudio, La Diva Tattoo, donde me especializo en estilos vibrantes como acuarela, full color, anime y neo tradicional, siempre explorando el fascinante mundo del color.</p>
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

export default InkYaque;
