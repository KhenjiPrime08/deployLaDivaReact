import React, { useContext } from 'react';
import '../styles/Css/Footer.css';
import { Link } from 'react-router-dom';
import iconos from '../assets/images/iconos/Iconos';
import { DarkModeContext } from '../context/DarkModeContext';

function Footer() {
  const { darkMode } = useContext(DarkModeContext);

  return (
    
    <footer className={`footer ${darkMode ? 'dark-mode' : 'light-mode'}`}>
        <section className="footer-left">
          <Link to="/sobreNosotros">Contacto</Link>
        </section>

        <section className="mid">
          <span className="copyright">© 2024 La diva tattoo, Inc</span>
        </section>

        <ul className="social-links">
          <li>
            <a href="#">
              <img src={iconos.tiktok} alt="TikTok" className="icono" />
            </a>
          </li>

          <li>
            <a href="#">
              <img src={iconos.facebook} alt="Facebook" className="icono" />
            </a>
          </li>

          <li>
            <a href="#">
              <img src={iconos.instagram} alt="Instagram" className="icono" />
            </a>
          </li>

        </ul>
    </footer>
    
  );
}

export default Footer;
