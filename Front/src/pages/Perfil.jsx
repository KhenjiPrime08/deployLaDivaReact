import React, { useEffect, useState } from 'react'
import '../styles/Css/Perfil.css'
import { Link, useNavigate } from 'react-router-dom';
import { logout } from '../services/userService';


function Perfil() {

  const navigate = useNavigate();

  const [user, setUser] = useState(
    {"name": "Juan Pérez",
    "email": "juan@example.com",
    "phone": "+123456789"},
    
  );

  const [appointments, setAppointments] = useState([
    { "id": 1, "date": "2025-03-10", "artist": "Tattoo Master A" },
    { "id": 2, "date": "2025-03-15", "artist": "Tattoo Master B" }
  ]);

  const [loading, setLoading] = useState(false);

  useEffect(() => {
    const loadData = async () => {
      const userData = await fetchUser();
      const appointmentsData = await fetchAppointments();
      setUser(userData);
      setAppointments(appointmentsData);
      setLoading(false);
    };

    loadData();
  }, []);
  
  const cerrarSesion = () => {
    logout()
    navigate("/login")
  }

  return (
    <div className="profile-container">
      {loading ? (
        <p className="loading">Cargando datos...</p>
      ) : user ? (
        <>
          <section className="profile-card">
            
            <h2>Perfil del Usuario</h2>
            <p><strong>Nombre:</strong> {user.name}</p>
            <p><strong>Correo:</strong> {user.email}</p>
            
            <article className='btns'>
              <Link to="/editar" className="edit-btn">Editar Perfil</Link>
              <Link to="/login" className="edit-btn" onClick={cerrarSesion}>Cerrar sesión</Link>
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