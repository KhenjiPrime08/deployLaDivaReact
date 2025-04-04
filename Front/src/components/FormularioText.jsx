import React, { useContext, useState } from "react";
import { DarkModeContext } from "../context/DarkModeContext";
import "../styles/Css/FormularioText.css"; 

function FormularioText({ onSave }) {
  const [text, setText] = useState("");
  const [newTitle, setNewTitle] = useState("");
  const { darkMode } = useContext(DarkModeContext);

  const handleTextChange = (e) => setText(e.target.value);
  const handleTitleChange = (e) => setNewTitle(e.target.value);
  const handleSubmit = (e) => {
    e.preventDefault();
    onSave(newTitle, text);
  };

  return (
    <form onSubmit={handleSubmit} className={`formulario-text ${darkMode ? "dark-mode" : ""}`}>
      <div className="form-group">
        <label>Título:</label>
        <input
          type="text"
          value={newTitle}
          onChange={handleTitleChange}
          placeholder="Edita el título"
        />
      </div>
      <div className="form-group">
        <label>Texto:</label>
        <textarea
          onChange={handleTextChange}
          placeholder="Edita el texto"
        />
      </div>
      <input type="submit" value="Cambiar" className="form-button" />
    </form>
  );
}

export default FormularioText;
