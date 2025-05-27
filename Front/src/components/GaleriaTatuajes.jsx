import React, { useContext } from 'react'
import '../styles/Css/GaleriaTatuajes.css'
import { DarkModeContext } from '../context/DarkModeContext';
import API_URL from '../config/config';

function GaleriaTatuajes({images, onDelete}) {

  const {darkMode} = useContext(DarkModeContext);

  return (
    <section className={`fondo ${darkMode ? "dark" : ""}`}>
      <section className="tattoo-gallery">
        {images.map((image, index) => (
          <section key={index} className="tattoo-item">
            <img src={`${API_URL}/upload/${image}`} alt={`Imagen ${index + 1}`} />

            {onDelete && (
              <button
                className="delete-btn"
                onClick={() => onDelete(image)}
              >
                🗑️
              </button>
            )}
            
          </section>
        ))}
      </section>
    </section>
    
  );
};

export default GaleriaTatuajes