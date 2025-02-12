import React from 'react'
import '../styles/Css/Formulario.css'

function Formulario({campos, formData, setFormData, onSubmit, buttonText}) {

    const handleChange = (e) => {
        setFormData({...formData, [e.target.name]: e.target.value});
    };

  return (
    <form className='form-container' onSubmit={onSubmit}>
      <section className='fondo'>
        {campos.map((campo) => (
          
            <div className="form-group" key={campo.nombre}>
              <label className='form-label'> {campo.label} </label>

              <input 
              className='form-input'
              type={campo.type}
              name={campo.nombre}
              value={formData[campo.nombre] || ""}
              onChange={handleChange}
              placeholder={campo.placeholder}
              required={campo.required}
              />
            </div>
          
            
        ))}
      </section>
       <button className='form-button' type="submit"> {buttonText} </button>
    </form>
  )
}

export default Formulario