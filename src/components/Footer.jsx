import React from 'react';
import '../styles/Css/Footer.css'; // Crea un archivo CSS o SASS
import iconos from '../assets/images/iconos/Iconos';

function Footer(){
  return (
    <footer className="footer">
      <section className="footer-content">

        <article className="footer-left">
          <span>&copy; 2025 La Diva Tattoo</span>
        </article>

        <article className="footer-right">
          <a href="https://www.facebook.com/profile.php?id=61553597955917" aria-label="Facebook" target="_blank" rel="noopener noreferrer">
            <img className="icon" src={iconos.facebook} alt="Facebook icon" />
          </a>
          <a href="https://www.tiktok.com/@la.diva.tattoo" aria-label="TikTok" target="_blank" rel="noopener noreferrer">
            <img className="icon" src={iconos.tiktok} alt="TikTok icon" />
          </a>
          <a href="https://www.instagram.com/la_diva_tattoo/" aria-label="Instagram" target="_blank" rel="noopener noreferrer">
            <img className="icon" src={iconos.instagram} alt="Instagram icon" />
          </a>
        </article>

      </section>
    </footer>
  );
};

export default Footer;
