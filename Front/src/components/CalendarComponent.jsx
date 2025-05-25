import React, { useState, useEffect } from 'react';
import { Calendar, dateFnsLocalizer } from 'react-big-calendar';
import format from 'date-fns/format';
import parse from 'date-fns/parse';
import startOfWeek from 'date-fns/startOfWeek';
import getDay from 'date-fns/getDay';
import 'react-big-calendar/lib/css/react-big-calendar.css';
import { es } from 'date-fns/locale';
import { getAllCitasConfirmadas } from '../services/citasConfirmadasService';
import CalendarToolbar from './CalendarToolbar';
import '../styles/Css/Calendario.css'

const locales = {
  'es': es,
};

const localizer = dateFnsLocalizer({
  format,
  parse,
  startOfWeek,
  getDay,
  locales,
});

function CalendarComponent(newEvent) {
  const [events, setEvents] = useState([]);
  const [ eventosSinFiltrar, setEventosSinFiltrar] = useState([]);
  const [filtroServicio, setFiltroServicio] = useState("todos");

  const eventosFiltrados = filtroServicio === "todos" ? events : events.filter(event => event.servicio === filtroServicio);

  useEffect(() => {
    setEventosSinFiltrar(newEvent.newEvent)

    const eventosConvertidos = eventosSinFiltrar.map(evento => ({
      ...evento,
      start: new Date(evento.start), //Hay que hacer esto para que react big calendar no se enfade con las fechas
      end: new Date(evento.end),
    }));

    setEvents(eventosConvertidos);
  

}, [newEvent]);

  
  return (
    <section className="calendar-component">
      <section className="calendar-wrapper">

      <select onChange={(e) => setFiltroServicio(e.target.value)} className='select-servicio'>
        <option value="todos">Todos</option>
        <option value="tatuaje">Tatuaje</option>
        <option value="piercing">Piercing</option>
        <option value="gema_dental">Gema Dental</option>
      </select>

        <Calendar
          localizer={localizer}
          events={eventosFiltrados}
          startAccessor="start"
          endAccessor="end"
          min={new Date(1970, 1, 1, 10, 0)}  // 10:00 AM
          max={new Date(1970, 1, 1, 23, 0)}  // 9:00 PM
          components={{
            toolbar: CalendarToolbar,
          }}
          style={{ height: 600 }}
          messages={{
            next: "Sig.",
            previous: "Ant.",
            today: "Hoy",
            month: "Mes",
            week: "Semana",
            day: "Día",
            agenda: "Agenda",
            date: "Fecha",
            time: "Hora",
            event: "Evento"
          }}
        />
      </section>
    </section>
  );
}

export default CalendarComponent;
