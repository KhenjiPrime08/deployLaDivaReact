import React, { useContext, useEffect, useState } from "react";
import "../styles/Css/FormularioAdmin.css";
import { DarkModeContext } from "../context/DarkModeContext";

const FormularioAdmin = ({ onSubmit, errores, loading, categoria }) => {
  const [file, setFile] = useState(null);
  const [error, setError] = useState("");
  const [preview, setPreview] = useState(null); // Estado para la vista previa de la imagen
  const {darkMode} = useContext(DarkModeContext);

  const handleFileChange = (e) => {
    const selectedFile = e.target.files[0];
    if (selectedFile) {
      setFile(selectedFile);
      setPreview(URL.createObjectURL(selectedFile)); // Crear la URL para la vista previa
      setError(""); // Limpiar el error si se selecciona un archivo
    }
  };

  const handleSubmit = async(e) => {
    e.preventDefault();

    if (!file) {
      setError("Error, no has seleccionado ninguna imagen.");
      return;
    }

    try {
        // Llamamos a onSubmit con el archivo y la categoría
        await onSubmit(file, categoria);
        setFile(null); // Reseteamos el archivo después de cargarlo
        setPreview(null);
      } catch (error) {
        console.error("Error al subir la imagen:", error);
        setError("Hubo un problema al subir la imagen");
      }
  };

  return (
    <section className={`fondo-admin ${darkMode ? "dark-mode" : ''}`}>
      <section className={`admin-upload ${darkMode ? "dark-mode" : ''}`}>
      <h2>Subir Nueva Imagen</h2>
      <form onSubmit={handleSubmit}>
        <input
          type="file"
          id="fileInput"
          accept="image/*"
          required
          onChange={handleFileChange} // Captura el archivo seleccionado
        />
        <label htmlFor="fileInput">Seleccionar Imagen</label>

        {/* Mostrar la vista previa si existe */}
        {preview && (
          <div className="preview-container">
            <img src={preview} alt="Vista previa" className="preview-img" />
          </div>
        )}

        <input type="submit" value="Subir imagen" disabled={!file} />

        {error && (
          <article className="error">
            <p>{error}</p>
          </article>
        )}

        {/*Apartado para los errores de fuera, es decir de las paginas que usen este componente*/}

        {errores && (
            <article className="error">
                <p>{errores}</p>
            </article>
        )}


      </form>
      </section>
    </section>
    
  );
};

export default FormularioAdmin;
