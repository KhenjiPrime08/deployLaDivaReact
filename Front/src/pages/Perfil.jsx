import React, { useEffect, useState } from 'react'
import '../styles/Css/Perfil.css'
import { Link, useNavigate } from 'react-router-dom';
import { jwtDecode } from "jwt-decode";
import { logout, getUser } from '../services/userService';


function Perfil() {

  const navigate = useNavigate();

  const [user, setUser] = useState(null);
  const [error, setError] = useState("");

  const [appointments, setAppointments] = useState([
    { "id": 1, "date": "2025-03-10", "artist": "Tattoo Master A" },
    { "id": 2, "date": "2025-03-15", "artist": "Tattoo Master B" }
  ]);

  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const cargarUsuario = async () => {
      try {

        const token = localStorage.getItem("token");
        

        if(!token){
          setError("No hay sesión activa");
          setLoading(false);
          return;
        }

        const decodedToken = jwtDecode(token);
        const userId = decodedToken.id; 

        const datos = await getUser(userId);
        setUser(datos.usuario);
      } catch (error) {
        setError("No se pudo obtener la información del usuario.");
      }finally{
        setLoading(false);
      }
    };

    cargarUsuario();
  }, []);
  
  const cerrarSesion = () => {
    logout()
    navigate("/login")
  }

  return (
    <div className="profile-container">
      {loading ? (
        <p className="loading">Cargando datos...</p>
      ) : error? ( 
      <section className='errores'>
        <h1 className='h1Error'>Error</h1>
        <p className='error'> {error} </p> 
    
        <Link to="/login" className="btn" onClick={cerrarSesion}>Cerrar sesión</Link>
      </section>
      
            

      ) : user ? (
        <>
          <section className="profile-card">
            
            <h2>Perfil del Usuario</h2>
            <p><strong>Nombre:</strong> {user.nombre}</p>
            <p><strong>Correo:</strong> {user.email}</p>
            
            <article className='btns'>
              <Link to="/editar" className="edit-btn">Editar perfil</Link>
              <Link to="/login" className="edit-btn" onClick={cerrarSesion}>Cerrar sesión</Link>
              <Link to="/delete" className="delete-btn">Borrar cuenta</Link>
            </article>
            

          </section>

          <div className="appointments">
            <h3>Mis Citas</h3>
            {appointments.length > 0 ? (
              <ul>
                {appointments.map((appt) => (
                  <li key={appt.id}>
                    📅 {appt.date} - {appt.artist}
                  </li>
                ))}
              </ul>
            ) : (
              <p>No tienes citas agendadas.</p>
            )}
          </div>
        </>
      ) : (
        <p>Error al cargar los datos.</p>
      )}
    </div>
  )
}

export default Perfil