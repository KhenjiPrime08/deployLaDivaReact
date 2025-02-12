import React from 'react';
import '../styles/Css/Footer.css'; // Crea un archivo CSS o SASS
import iconos from '../assets/images/iconos/Iconos';

function Footer(){
  return (
    <footer className="footer">
      <section className="footer-content">

        <article className="footer-left">
          <span className='infor'>&copy; La Diva Tatoo</span>
          <span className='infor'><img src={iconos.movil} alt="Icono de un correo" className='icono' /> 660 59 31 54 </span>
          <span className='infor'><img src={iconos.correo} alt="Icono de un correo" className='icono' /> <a href="mailto:ladivatattoo@gmail.com">Enviar correo</a>
          </span>
          <span className='infor'><img src={iconos.ubicacion} alt="Icono de un correo" className='icono' /> C. Palangre 1, 35510 Puerto Del Carmen, Tías</span>
          
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
