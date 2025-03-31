import React, { useContext, useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { jwtDecode } from "jwt-decode";

import { DarkModeContext } from '../context/DarkModeContext';
import '../styles/Css/Delete.css'
import { deleteUser } from '../services/userService';

function DeleteAcc() {
    const {darkMode} = useContext(DarkModeContext);
    const [error, setError] = useState("");
    const navigate = useNavigate();

    const handleDelete  = async () => {

        try {
            const token = localStorage.getItem("token");
            if(!token){
                setError("No hay token, no esta registrado/logged")
                return;
            }

            const decoded = jwtDecode(token);
            const userId = decoded.id;

            await deleteUser(userId);

            localStorage.removeItem("token");
            window.dispatchEvent(new Event("loginStatusChanged"));
            navigate("/login");
        } catch (error) {
            setError(error.message);
        }

    }

  return (
    <section className='back'>
        <section className={`card ${darkMode ? 'dark-mode' : ''}`}>
            <h1 className='h1Card'>Eliminar cuenta</h1>
            <p>¿Estas seguro que quieres eliminar tu cuenta? Es una acción irreversible</p>

            {error && <p className="error">{error}</p>}
            <article className='btns'>
                <Link className="delete-btn" onClick={handleDelete}>Si, borrar</Link>
                <Link to="/" className="btn">No, volver al home</Link>
            </article>
        </section>
        
    </section>
  )
}

export default DeleteAcc