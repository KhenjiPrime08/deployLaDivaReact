import React, { useContext, useEffect, useState } from "react";
import { eliminarCita, getAllCitas } from "../services/citaService";
import { cancelarCita, confirmarCita, getAllCitasConfirmadas } from "../services/citasConfirmadasService";

import "../styles/Css/CitasAdmin.css";
import { DarkModeContext } from "../context/DarkModeContext";
import { UserContext } from "../context/userContext";
import { useNavigate } from "react-router-dom";


function CitasAdmin() {
  const { isAdmin } = useContext(UserContext);
  const navigate = useNavigate();
  const [estadoFiltro, setEstadoFiltro] = useState("todas");

  const [ citas, setCitas ] = useState([]);
  const [ citaSeleccionada, setCitaSeleccionada ] = useState(null);
  const [ citasConfirmadas, setCitasConfirmadas ] = useState([]);

  const [ fechaAsignada, setFechaAsignada ] = useState("");
  const [ horaInicio, setHoraInicio ] = useState("");
  const [ horaFin, setHoraFin ] = useState("");
  const [ notasAdmin, setNotasAdmin ] = useState("");
  const [ artista, setArtista ] = useState("");
  const [ expandedCardId, setExpandedCardId ] = useState(null);

  const { darkMode } = useContext(DarkModeContext);
  const token = localStorage.getItem("token");

  const titulosPorEstado = {
    todas: "Todas las citas asignadas",
    pendiente_pago: "Citas pendientes de pago",
    confirmada: "Citas confirmadas",
  };

  if (!isAdmin) {
    navigate("/"); // Redirige al inicio si no es admin
  }

  //UseEffect para cargar las citas entrantes, las de la izq
  useEffect(() => {
    async function cargarCitas() {
      const citasObtenidas = await getAllCitas(token);
      setCitas(citasObtenidas);
    }

    cargarCitas();
  }, [citas]);


  //UseEffect para mostrar las citas confirmadas, las de la derecha
  useEffect(() => {
    async function cargarCitasConfirmadas() {
      const citasConfirmadas = await getAllCitasConfirmadas(token);
      setCitasConfirmadas(citasConfirmadas);
    }

    cargarCitasConfirmadas();
  }, [citas]);

  const citasPendientes = citas.filter((cita) => cita.estado === "pendiente");

  const citasFiltradas = citasConfirmadas.filter((cita) => {
    if (estadoFiltro === "todas") return true;
    return cita.estado === estadoFiltro;
  });

  const handleConfirmar = async () => {
    if (!fechaAsignada || !horaInicio || !horaFin || !artista ) {
      alert("Por favor, selecciona una fecha y hora para confirmar la cita.");
      return;
    }

    if (horaFin <= horaInicio) {
        alert("La hora de fin debe ser mayor que la hora de inicio.");
        return;
    }
    

    try {
      await confirmarCita(
        citaSeleccionada.id,
        {
          fechaAsignada,
          horaInicio,
          horaFin,
          notasAdmin,
          artista,
          estado: "confirmada",
        },
        token
      );

      setCitaSeleccionada(null);
      setFechaAsignada("");
      setHoraInicio("");
      setHoraFin("");
      setNotasAdmin("");

      const citasObtenidas = await getAllCitas(token);
      setCitas(citasObtenidas);
    } catch (error) {
      console.error("Error al confirmar la cita:", error);
    }
  };

  const handleCancelar = async(cita) => {
    try{
      const citaEliminada = await eliminarCita(cita.id, token)


    }catch(error){
      console.error("Error eliminando la cita",error)
    }
  }


  return (
    <section className={`principal ${darkMode ? "dark-mode" : ""}`}>
      <section className="row">
        <section className="pendientes">
          <h1 className="h1">Citas Pendientes</h1>
          {citasPendientes.length === 0 ? (
            <p>No hay citas pendientes</p>
          ) : (
            <ul className="ul">
              {/*IZQUIERDA */}
              {citasPendientes.map((cita) => (
                <li key={cita.id} className="li">
                  <p className="p">
                    Diseño: {cita.diseno} <br />
                    Fecha preferible: {cita.fecha}
                  </p>
                  
                    {cita.imagenDisenoUrl ? (
                      <img
                        src={cita.imagenDisenoUrl}
                        alt="Diseño"
                        width="150"
                      />
                    ) : (
                      <p className="p">No hay imagen del diseño</p>
                    )}
                    <br />
                  
                  <input
                    type="button"
                    onClick={() => setCitaSeleccionada(cita)}
                    value={"Confirmar cita"}
                    className="btn"
                  />
                  <input
                    type="button"
                    onClick={() => handleCancelar(cita)}
                    value={"Cancelar cita"}
                    className="boton-cancelar"
                  />
                </li>
              ))}
            </ul>
          )}

          {citaSeleccionada && (
            <section className="cita-seleccionada">
                <h2 className="h2">
                    Confirmar cita para: {citaSeleccionada.diseno}
                </h2>
                <section className="form">

                    <span id="fecha-label" className="label-form">Fecha:</span>

                    <input
                    id="fechaAsignada"
                    type="date"
                    value={fechaAsignada}
                    onChange={(e) => setFechaAsignada(e.target.value)}
                    className="input-form"
                    aria-label="Fecha"
                    />

                    <span id="horaInicio-label" className="label-form">Hora de inicio:</span>
                    <input
                    id="horaInicio"
                    type="time"
                    value={horaInicio}
                    onChange={(e) => setHoraInicio(e.target.value)}
                    className="input-form"
                    />

                    <span id="horFin-label" className="label-form">Hora de fin:</span>
                    <input
                    id="horaFin"
                    type="time"
                    value={horaFin}
                    onChange={(e) => setHoraFin(e.target.value)}
                    className="input-form"
                    />

                    <label htmlFor="artista" className="label">
                        Asignar artista:
                    </label>
                    <select
                      id="artista"
                      value={artista}
                      onChange={(e) => setArtista(e.target.value)}
                      className="select"
                    >
                      {/* Añadir  que se filtre dependiendo del servicio, si es tatoo yani ale ....*/}
                      <option value="default">Elegir</option>
                      <option value="yani">Yani</option>
                      <option value="alex">Alex</option>
                      <option value="mara">Mara</option>
                      <option value="lorena">Lorena</option>
                    </select>

                    <span id="notasAdmin" className="label-form">Notas del admin:</span>
                    <input
                    id="notasAdmin"
                    type="text"
                    value={notasAdmin}
                    onChange={(e) => setNotasAdmin(e.target.value)}
                    placeholder="Notas del admin (Opcional)"
                    className="input-form"
                    />
                    

                    <input
                    type="submit"
                    onClick={handleConfirmar}
                    value="Confirmar"
                    className="btn"
                    />

                    <input
                    type="submit"
                    onClick={() => setCitaSeleccionada(null)}
                    value="Cancelar"
                    className="delete-btn"
                    />
                </section>
            </section>
          )}
        </section>

        <section>

          {/*CENTRO */}
          <iframe
            src="https://calendar.google.com/calendar/embed?src=ladivatattoo%40gmail.com&ctz=Atlantic%2FCanary"
            style={{ border: 0 }}
            width="700"
            height="600"
            className="calendar"
          />

        </section>
      
        <section className="confirmadas">
          {/* DERECHA */}

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
            <option value="confirmada">Confirmada</option>
          </select>


          <h1 className="h1">{titulosPorEstado[estadoFiltro]}</h1>

          {citasFiltradas.length === 0 ? (
            <p className="p-cita">No hay citas en este estado.</p>
          ) : (
            <ul className="citas-cards">
              {citasFiltradas.map((cita) => (
                <li
                  key={cita.id}
                  className={`cita-card ${
                    expandedCardId === cita.id ? "expandida" : ""
                  }`}
                  onClick={() =>
                    setExpandedCardId(
                      expandedCardId === cita.id ? null : cita.id
                    )
                  }
                >
                  { cita.Citum.imagenDisenoUrl && (
                    <img
                    src={cita.Citum.imagenDisenoUrl}
                    alt="Diseño"
                    width={150}
                    className="imagen-diseno"
                  />
                  )}
                  <p>
                    <strong>Diseño:</strong> {cita.Citum.diseno} <br />
                    <strong>Servicio: </strong> {cita.Citum.servicio} <br />
                    <strong>Artista:</strong> {cita.artista} <br />
                  </p>

                  {expandedCardId === cita.id && (
                    <article className="info-cita-expandida">
                      <p>
                        <strong>Cliente:</strong>{" "}
                        {cita.Citum.Usuario.nombre}
                      </p>
                      <p>
                        <strong>Email:</strong> {cita.Citum.Usuario.email}
                      </p>
                      <p>
                        <strong>Teléfono:</strong>{" "}
                        {cita.Citum.Usuario.telefono}
                      </p>
                      <p>
                        <strong>Fecha:</strong> {cita.fechaAsignada}
                      </p>
                      <p>
                        <strong>Hora inicio:</strong> {cita.horaInicio}
                      </p>
                      <p>
                        <strong>Hora fin:</strong> {cita.horaFin}
                      </p>
                      <p>
                        {notasAdmin && ( <span> <strong>Notas:</strong> {cita.notasAdmin} </span> ) }
                      </p>
                    </article>
                  )}
                </li>
              ))}
            </ul>
          )}
        </section>
      </section>
    </section>
  );
}

export default CitasAdmin;
