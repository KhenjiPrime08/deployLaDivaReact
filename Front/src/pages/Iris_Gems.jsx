import React, { useContext, useEffect, useState } from "react";
import gemas from "../assets/images/gemas_dentales/gemas";
import Presentacion from "../components/Presentacion";
import Separador from "../components/Separador";
import GaleriaTatuajes from "../components/GaleriaTatuajes";
import { UserContext } from "../context/userContext";
import FormularioAdmin from "../components/FormularioAdmin";
import { uploadImage, fetchImages, deleteImage } from "../services/uploadService";
import FormularioText from "../components/FormularioText";

function Iris_Gems() {
  const { isAdmin } = useContext(UserContext);
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);
  const categoria = "gema";

  //En esta galeria se van a meter las otras fotos aunque el valor en el codigo no cambie
  const [galeria, setGaleria] = useState([]);

  //  Texto y título con almacenamiento en localStorage
  const [titulo, setTitulo] = useState(() => {
    return localStorage.getItem("tituloGema") || "Iris Gems: Gemas Dentales de Alta Calidad";
  });

  const [textoPresentacion, setTextoPresentacion] = useState(() => {
    const textoGuardado = localStorage.getItem("textoGema");
    return textoGuardado ? JSON.parse(textoGuardado) : [
      "Lorena es el corazón cálido de nuestro estudio. Como recepcionista, se encarga de que todo esté en su lugar, creando un ambiente organizado y acogedor para que cada cliente se sienta como en casa desde el momento en que entra.",
      "Además, Lorena tiene una habilidad única que ilumina aún más las sonrisas: ¡es especialista en la colocación de gemas dentales! Si deseas darle un toque especial a tu sonrisa, ella estará encantada de ayudarte a brillar tanto por dentro como por fuera."
    ];
  });

  // Guardar cambios en localStorage cuando se actualiza
  useEffect(() => {
    localStorage.setItem("tituloGema", titulo);
    localStorage.setItem("textoGema", JSON.stringify(textoPresentacion));
  }, [titulo, textoPresentacion]);

  // Actualiza el texto desde el formulario
  const handleSaveChanges = (newTitle, newTextArray) => {
    setTitulo(newTitle);
    setTextoPresentacion(newTextArray);
  };

  // ✅ Cargar imágenes desde backend
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
  }, [loading]); // Se vuelve a ejecutar al subir una imagen

  //Subir nueva imagen
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
        imagen={gemas.gema1}
        titulo={titulo}
        texto={
          <article>
            {textoPresentacion.map((parrafo, index) => (
              <p key={index}>{parrafo}</p>
            ))}
          </article>
        }
      />

      <Separador />

      <GaleriaTatuajes images={galeria} onDelete={isAdmin ? handleDeleteImage : null}/>

      {isAdmin && (
        <section>
          <FormularioAdmin onSubmit={handleNewImage} loading={loading} errores={error} categoria={categoria} />
          {/* <FormularioText
            title={titulo}
            initialText={textoPresentacion.join("\n")}
            onSave={(title, text) => handleSaveChanges(title, text.split("\n").filter(p => p.trim() !== ""))}
          /> */}
        </section>
      )}
    </section>
  );
}

export default Iris_Gems;
