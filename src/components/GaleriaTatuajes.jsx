import React from 'react'
import '../styles/Css/GaleriaTatuajes.css'

function GaleriaTatuajes({images}) {
  return (
    <section className="tattoo-gallery">
      {images.map((image, index) => (
        <section key={index} className="tattoo-item">
          <img src={image} alt={`Tatuaje ${index + 1}`} />
        </section>
      ))}
    </section>
  );
};

export default GaleriaTatuajes