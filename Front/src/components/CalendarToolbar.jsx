// CustomToolbar.jsx
import React from 'react';
import '../styles/Css/CalendarioToolbar.css'; // Asegúrate de que la ruta sea correcta

const CustomToolbar = (toolbar) => {
  const goToBack = () => toolbar.onNavigate('PREV');
  const goToNext = () => toolbar.onNavigate('NEXT');
  const goToToday = () => toolbar.onNavigate('TODAY');
  const label = toolbar.label;

  const handleViewChange = (view) => {
    toolbar.onView(view);
  };

  return (
    <div className="custom-toolbar">
      <div className="navigation">
        <input type="button" value="Ant." onClick={goToBack} />
        <input type="button" value="Hoy" onClick={goToToday} />
        <input type="button" value="Sig." onClick={goToNext} />
      </div>

      <span className="label">{label}</span>

      <div className="view-switcher">
        <input
          type="button"
          value="Mes"
          onClick={() => handleViewChange('month')}
        />
        <input
          type="button"
          value="Semana"
          onClick={() => handleViewChange('week')}
        />
        <input
          type="button"
          value="Día"
          onClick={() => handleViewChange('day')}
        />
        <input
          type="button"
          value="Agenda"
          onClick={() => handleViewChange('agenda')}
        />
      </div>
    </div>
  );
};

export default CustomToolbar;
