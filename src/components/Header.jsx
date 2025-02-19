import React, { useContext, useState } from 'react';
import iconos from '../assets/images/iconos/Iconos.js'
import "../styles/Css/Header.css";
import { Link } from 'react-router-dom';
import LoginContext from '../context/LoginContext.jsx';
import { DarkModeContext } from '../context/DarkModeContext.jsx';

function Header() {
    const { logged } = useContext(LoginContext);
    const { darkMode, toggleTheme } = useContext(DarkModeContext);
    const [menuOpen, setMenuOpen] = useState(false); // Estado para el menú

    return (
        <header className={darkMode ? "dark" : ""}>
            <article className="logo-container">
                <Link to='/'>
                    <img src={darkMode ? iconos.logo : iconos.logo_oscuro} alt="Logo de la diva" className={`logo ${darkMode ? "dark" : ""}`} />
                </Link>
                {/* Botón de menú hamburguesa */}
                <button className="menu-toggle" onClick={() => setMenuOpen(!menuOpen)}>
                    ☰
                </button>
            </article>
            
            {/* Menú de navegación */}
            <nav className={menuOpen ? "open" : ""}>
                <ul>
                    <li className={`navbar icono ${darkMode ? "dark" : ""}`} onClick={toggleTheme}>
                        <img src={darkMode ? iconos.sun : iconos.moon} alt={darkMode ? "Modo claro" : "Modo oscuro"} />
                    </li>
                    <li className={`navbar ${darkMode ? "dark" : ""}`}><Link to="/sobreNosotros">Sobre Nosotros </Link></li>
                    <li className={`navbar ${darkMode ? "dark" : ""}`}> <Link to={logged ? "/citaTattoo" : "/login"}>Pedir cita Tattoo</Link></li>
                    <li className={`navbar ${darkMode ? "dark" : ""}`}> <Link to={logged ? "/citaPiercing" : "/login"}> Pedir cita Piercing </Link></li>
                    <li className={`navbar ${darkMode ? "dark" : ""}`}><Link to={logged ? "/perfil" : "/login"}> {logged ? "Perfil" : "Iniciar sesión"} </Link></li>
                    <li className={`navbar languages ${darkMode ? "dark" : ""}`}>
                        <img src={iconos.esp} alt="Spain flag" />
                        <ul className={`flags-dropdown ${darkMode ? "dark" : ""}`}>
                            <li><img src={iconos.eng} alt="England flag" /></li>
                            <li><img src={iconos.de} alt="German flag" /></li>
                        </ul>
                    </li>
                </ul>
            </nav>
        </header>
    );
}

export default Header;
