import React, { useContext, useEffect, useState } from 'react';
import '../styles/Css/Perfil.css';
import { Link, useNavigate } from 'react-router-dom';
import { jwtDecode } from "jwt-decode";
import { logout, getUser } from '../services/userService';
import { DarkModeContext } from '../context/DarkModeContext.jsx';
import { getAllCitasConfirmadasUser, cancelarCita } from '../services/citasConfirmadasService'; // Importa la función
import StripePago from '../components/StripePago.jsx';


function Perfil() {
//Principales
  const navigate = useNavigate();
  const { darkMode } = useContext(DarkModeContext);
  const token = localStorage.getItem("token");

  // Estados para manejar el perfil del usuario
  const [estadoFiltro, setEstadoFiltro] = useState("todas");
  const [user, setUser] = useState(null);
  const [error, setError] = useState("");
  const [citas, setCitas] = useState([]); // Aquí guardamos las citas
  const [loading, setLoading] = useState(true);

  const titulosPorEstado = {
    todas: "Todas las citas asignadas",
    asignadas: "Citas asignadas",
    pendiente_pago: "Citas pendientes de pago",
    pagada: "Citas pagadas",
    cancelada: "Citas canceladas",
  };

  //Modales popup para aceptar o rechazar citas
  const [modalCita, setModalCita] = useState(null); // Guarda la cita seleccionada para modal
  const [mostrarPago, setMostrarPago] = useState(false);
  const [mostrarRechazo, setMostrarRechazo] = useState(false);
  const [motivoCancelacion, setMotivoRechazo] = useState("");
  const [resultado, setResultado] = useState("");
  const [ cerrarModal, setCerrarModal ] = useState(false);


  const aceptarCita = () => {
    setMostrarPago(true); // Muestra el modal de pago
  };
  
  const rechazarCita = () => {
    setMostrarRechazo(true); // Muestra el formulario de rechazo
  };
  
  const enviarRechazo = async () => {
    try {

      const token = localStorage.getItem("token"); // Obtener el token del localStorage

      await cancelarCita(modalCita.id, motivoCancelacion , token); // Llamar a la función para cancelar la cita
      setCitas((prevCitas) => prevCitas.filter((cita) => cita.id !== modalCita.id)); // Actualiza el estado de citas
      setResultado("Cita rechazada con éxito.");

      setMostrarRechazo(false);
      setModalCita(null);
      setMotivoRechazo("");
    }
    catch (error) {
      console.error("Error al rechazar la cita:", error);
      setResultado("Error al rechazar la cita. Por favor, inténtalo de nuevo.");
    }
  };
  

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
          const citas = await getAllCitasConfirmadasUser(user.id, token); // Llamamos a la función para obtener las citas
          setCitas(citas);
        } catch (err) {
          setCitas([]); // Si ocurre un error, las citas estan vacias
        }
      }
    };

    obtenerCitasDelUsuario();
  }, [user?.id, token, citas]);


  //UseEffect para cerrar el modal cuando el pago sea exitoso
  useEffect(() => {
    if (cerrarModal) {
      const timeout = setTimeout(() => {
        setMostrarPago(false);     
        setModalCita(null);        
        setCerrarModal(false);     
      }, 3000); // 3 segundos
  
      return () => clearTimeout(timeout); // Limpia si el componente se desmonta antes
    }
  }, [cerrarModal]);


  const cerrarSesion = () => {
    logout();
    navigate("/login");
  };

  // Filtrar citas por estado
  const citasFiltradas = citas.filter((cita) => {
    if (estadoFiltro === "todas") return true;
    return cita.estado === estadoFiltro;
  });

  return (
    <section className="profile-container">
      {loading ? (
        <p className="loading">Cargando datos...</p>
      ) : error ? (
        <section className={`errores ${darkMode ? "dark" : ""}`}>
          <h1 className="h1Error">Error</h1>
          <p className="error">{error}</p>
          <Link to="/login" className="btn" onClick={cerrarSesion}>Cerrar sesión</Link>
        </section>
      ) : (
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

          <section className="appointments">
            <h3>{titulosPorEstado[estadoFiltro]}</h3>

            <label htmlFor="estadoFiltro" className="label">
              Filtrar por estado:
            </label>
            <select
              id="estadoFiltro"
              value={estadoFiltro}
              onChange={(e) => setEstadoFiltro(e.target.value)}
              className="select"
            >
              <option value="todas">Todas</option>
              <option value="pendiente_pago">Pendiente de pago</option>
              <option value="pagada">Pagadas</option>
              <option value="cancelada">Canceladas</option>
            </select>

            {citasFiltradas.length > 0 ? (
              <ul>
                {citasFiltradas.map((appt) => (
                  <li key={appt.id}>
                    📅 {appt.fechaAsignada} - {appt.servicio} - {appt.estado} - {appt.artista}
                    {appt.estado === 'pendiente_pago' && (
                      <input type='button' className="boton" onClick={() => setModalCita(appt)} value={"Ver opciones"} />
                    )}
                  </li>
                ))}
              </ul>
            ) : (
              <p>No tienes citas {estadoFiltro}.</p>
            )}
          </section>

          {/* MODALES para aceptar o rechazar cita */}

          {modalCita && (
            <section className="modal-cita">
              <section className="modal-contenido principal">
                <h2>Confirmar cita</h2>
                <p><strong>Fecha:</strong> {modalCita.fechaAsignada}</p>
                <p><strong>Servicio:</strong> {modalCita.servicio}</p>
                <p>¿Quieres aceptar esta cita?</p>

                <article className="acciones">
                  <input type='button' className="btn aceptar" onClick={aceptarCita} value={"Aceptar y pagar"} />
                  <input type='button' className="btn rechazar" onClick={rechazarCita} value={"Rechazar"} />
                  <input type='button' className="btn cerrar" onClick={() => {
                    setModalCita(null);
                    setMostrarPago(false);
                    setMostrarRechazo(false);
                  }} value={"Cerrar"} 
                  />
                </article>
              </section>

              {/* Modal de PAGO a la derecha */}
              {mostrarPago && (
                <section className="modal-contenido pago">
                  <StripePago citaConfirmada={modalCita} modalPago={setMostrarPago} cerrarModal={setCerrarModal} />
                </section>
              )}

              {/* Modal de RECHAZO a la izquierda */}
              {mostrarRechazo && (
                <section className="modal-contenido rechazo">
                  <h2 className='h2'>Motivo de rechazo</h2>
                  <textarea
                    value={motivoCancelacion}
                    onChange={(e) => setMotivoRechazo(e.target.value)}
                    placeholder="Escribe el motivo de rechazo..."
                  />
                  <article className='botones-rechazo'>
                  <input type='button' className="btn rechazar" onClick={enviarRechazo} value={"Enviar rechazo"} />
                  <input type='button' className="btn cerrar" onClick={() => setMostrarRechazo(false)} value={"Cancelar"} />
                  </article>
                  
                  <p>{resultado}</p>
                </section>
              )}
            </section>
          )}

        </>
      )}
    </section>
  );
}

export default Perfil;
