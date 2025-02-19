import React, { useContext} from 'react';
import iconos from '../assets/images/iconos/Iconos.js'
import "../styles/Css/Header.css";
import { Link } from 'react-router-dom';
import LoginContext from '../context/LoginContext.jsx';
import { DarkModeContext } from '../context/DarkModeContext.jsx';

function Header() {
    const { islogged } = useContext(LoginContext);
    const { darkMode, toggleTheme } = useContext(DarkModeContext);

    return (
        <header className={darkMode ? "dark" : ""}>
            <article className="logo-container">
                <Link to='/'>
                    <img src={darkMode ? iconos.logo : iconos.logo_oscuro} alt="Logo de la diva" className={`logo ${darkMode ? "dark" : ""}`} />
                </Link>
            </article>
            <nav>
                <ul>
                    <li className={`navbar icono ${darkMode ? "dark" : ""}`}><img src={darkMode ? iconos.sun : iconos.moon} alt={ darkMode ? "Modo claro" : "Modo oscuro"} onClick={toggleTheme} /></li>
                    <li className={`navbar ${darkMode ? "dark" : ""}`}><Link to="/sobreNosotros">Sobre Nosotros </Link></li>
                    <li className={`navbar ${darkMode ? "dark" : ""}`}> <Link to={islogged ? "/citaTattoo" : "/login"}>Pedir cita Tattoo</Link></li>
                    <li className={`navbar ${darkMode ? "dark" : ""}`}> <Link to={islogged ? "/citaPiercing" : "/login"}> Pedir cita Piercing </Link></li>
                    <li className={`navbar ${darkMode ? "dark" : ""}`}><Link to={islogged ? "/perfil" : "/login"}> {islogged ? "Perfil" : "Iniciar sesión"} </Link> </li>
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
