import React, { useState } from 'react';
import logo from "../assets/images/otros/logo_Diva.webp";
import sun from "../assets/images/iconos/sol.webp";
import moon from "../assets/images/iconos/luna.webp";
import esp from "../assets/images/iconos/banderaEsp.webp";
import eng from "../assets/images/iconos/reino-unido.webp";
import de from "../assets/images/iconos/aleman.webp";
import "../styles/Css/Header.css";

function Header({darkmode, toggleTheme}) {

    const [logged, setLogged] = useState(false); // Solo como ejemplo

    return (
        <header>
            <article className="logo-container">
                <img src={logo} alt="Logo de la diva" className="logo" />
            </article>
            <nav>
                <ul>
                    <li className='navbar'><img src={darkmode ? sun : moon } alt={ darkmode ? "Modo claro" : "Modo oscuro"} onClick={toggleTheme} /></li>
                    <li className='navbar'>Inicio</li>
                    <li className='navbar'>Sobre Nosotros</li>
                    <li className='navbar'>Pedir cita piercing</li>
                    <li className='navbar'>Pedir cita Tatoo</li>
                    <li className='navbar'>{logged ? "Perfil" : "Iniciar sesión"}</li>
                    <li className='navbar languages'>
                        <img src={esp} alt="Spain flag" />
                        <ul className="flags-dropdown">
                            <li><img src={eng} alt="England flag" /></li>
                            <li><img src={de} alt="German flag" /></li>
                        </ul>
                    </li>
                </ul>
            </nav>
        </header>
    );
}

export default Header;
