import React, { useState } from 'react';
import iconos from '../assets/images/iconos/Iconos.js'
import "../styles/Css/Header.css";

function Header({darkmode, toggleTheme}) {

    const [logged, setLogged] = useState(false); // Solo como ejemplo

    return (
        <header>
            <article className="logo-container">
                <img src={darkmode ? iconos.logo : iconos.logo_oscuro} alt="Logo de la diva" className="logo" />
            </article>
            <nav>
                <ul>
                    <li className='navbar'><img src={darkmode ? iconos.sun : iconos.moon } alt={ darkmode ? "Modo claro" : "Modo oscuro"} onClick={toggleTheme} /></li>
                    <li className='navbar'>Inicio</li>
                    <li className='navbar'>Sobre Nosotros</li>
                    <li className='navbar'>Pedir cita piercing</li>
                    <li className='navbar'>Pedir cita Tatoo</li>
                    <li className='navbar'>{logged ? "Perfil" : "Iniciar sesión"}</li>
                    <li className='navbar languages'>
                        <img src={iconos.esp} alt="Spain flag" />
                        <ul className="flags-dropdown">
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
