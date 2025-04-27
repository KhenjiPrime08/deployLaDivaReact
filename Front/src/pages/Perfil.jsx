import React, { useContext, useEffect, useState } from 'react';
import '../styles/Css/Perfil.css';
import { Link, useNavigate } from 'react-router-dom';
import { jwtDecode } from "jwt-decode";
import { logout, getUser } from '../services/userService';
import { DarkModeContext } from '../context/DarkModeContext.jsx';
import { getCitas } from '../services/citaService'; // Importa la función

function Perfil() {

  const navigate = useNavigate();
  const { darkMode } = useContext(DarkModeContext);
  const token = localStorage.getItem("token");

  const [user, setUser] = useState(null);
  const [error, setError] = useState("");
  const [citas, setCitas] = useState([]); // Aquí guardamos las citas
  const [loading, setLoading] = useState(true);

  // Función para cargar los datos del usuario
  useEffect(() => {
    const cargarUsuario = async () => {
      try {
        if (!token) {
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
      } finally {
        setLoading(false);
      }
    };

    cargarUsuario();
  }, []);

  // Función para obtener las citas del usuario
  useEffect(() => {
    const obtenerCitasDelUsuario = async () => {

      if (user?.id) {
        try {
          const citas = await getCitas(user.id, token); // Llamamos a la función para obtener las citas
          setCitas(citas);
        } catch (err) {
          setCitas([]); // Si ocurre un error, lo mostramos
        }
      }
    };

    obtenerCitasDelUsuario();
  }, [user?.id, token]);

  const cerrarSesion = () => {
    logout();
    navigate("/login");
  };

  return (
    <div className="profile-container">
      {loading ? (
        <p className="loading">Cargando datos...</p>
      ) : error ? (
        // Si hay un error en la carga de datos, mostramos el mensaje de error
        <section className={`errores ${darkMode ? "dark" : ""}`}>
          <h1 className="h1Error">Error</h1>
          <p className="error">{error}</p>
          <Link to="/login" className="btn" onClick={cerrarSesion}>Cerrar sesión</Link>
        </section>
      ) : (
        // Si no hay error, mostramos el perfil y las citas
        <>
          <section className="profile-card">
            <h2>Perfil del Usuario</h2>
            <p><strong>Nombre:</strong> {user.nombre}</p>
            <p><strong>Correo:</strong> {user.email}</p>

            <article className="btns">
              <Link to="/editar" className="edit-btn">Editar perfil</Link>
              <Link to="/login" className="edit-btn" onClick={cerrarSesion}>Cerrar sesión</Link>
              <Link to="/delete" className="delete-btn">Borrar cuenta</Link>
            </article>
          </section>

          <div className="appointments">
            <h3>Mis Citas</h3>
            {/* Comprobamos si el usuario tiene citas y mostramos el mensaje adecuado */}
            {citas.length > 0 ? (
              <ul>
                {citas.map((appt) => (
                  <li key={appt.id}>
                    📅 {appt.fecha} - {appt.servicio}
                  </li>
                ))}
              </ul>
            ) : (
              <p>No tienes citas agendadas.</p>
            )}
          </div>
        </>
      )}
    </div>
  );
}

export default Perfil;
