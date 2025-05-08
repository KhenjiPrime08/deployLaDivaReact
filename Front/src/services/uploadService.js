// src/services/uploadService.js
import API_URL from '../config/config'

// Función para subir la imagen y la categoría al backend
const uploadImage = async (file, categoria) => {
    const formData = new FormData();
    formData.append('imagen', file);  // Se añade el archivo de imagen
    formData.append('categoria', categoria);  // Se añade la categoría
  
  
    try {
      const response = await fetch(`${API_URL}/upload/subir-imagen-${categoria}`, {
        method: 'POST',
        body: formData,  // FormData manejará el tipo multipart/form-data automáticamente
      });
  
      // Si la respuesta no es correcta, lanza un error
      if (!response.ok) {
        const data = await response.json();
        throw new Error(data.mensaje || 'Error desconocido al subir la imagen');
      }
  
      const data = await response.json();
      
      return data.url;  // Devuelve la URL de la imagen subida
    } catch (error) {
      console.error('Error al subir la imagen:', error);
      throw error;  // Vuelve a lanzar el error para manejarlo en el componente
    }
  };
  
// Función para obtener las imágenes de una categoría
const fetchImages = async (categoria) => {
  try {
    const response = await fetch(`${API_URL}/upload/imagenes/${categoria}`);


    if (!response.ok) {
      throw new Error('No se pudieron cargar las imágenes');
    }
    return await response.json();  // Devuelve un array de URLs de las imágenes
  } catch (error) {
    console.error('Error al cargar las imágenes:', error);
    return [];  // En caso de error, devolvemos un array vacío
  }
};

  // Borra una imagen del servidor
const deleteImage = async (url) => {
  const response = await fetch(`${API_URL}/upload/delete-image`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ url }),
  });

  if (!response.ok) {
    throw new Error("No se pudo eliminar la imagen");
  }
};

  
  export { uploadImage, fetchImages, deleteImage};