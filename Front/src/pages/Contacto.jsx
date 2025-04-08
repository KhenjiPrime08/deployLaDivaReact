import React, { useContext, useState } from 'react';
import { contactar } from '../services/userService';
import { DarkModeContext } from '../context/DarkModeContext';
import '../styles/Css/Contacto.css'; // Asegúrate de tener este archivo CSS para estilos

function Contacto() {
    const [nombre, setNombre] = useState('');
    const [email, setEmail] = useState('');
    const [mensaje, setMensaje] = useState('');
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState('');
    const [success, setSuccess] = useState('');
    const { darkMode } = useContext(DarkModeContext);

    const handleSubmit = async (e) => {
        e.preventDefault();

        // Validación básica del formulario
        if (!nombre || !email || !mensaje) {
            setError('Todos los campos son obligatorios');
            return;
        }

        setLoading(true);
        setError('');
        setSuccess('');

        try {
            // Llamada al servicio
            await contactar(nombre, email, mensaje);
            setSuccess('Tu mensaje ha sido enviado con éxito');
            // Limpiar el formulario después del envío
            setNombre('');
            setEmail('');
            setMensaje('');
        } catch (error) {
            console.error('Error al enviar el mensaje:', error);
            setError('Hubo un error en el servidor. Intenta de nuevo más tarde.');
        } finally {
            setLoading(false);
        }
    };

    return (
        <section className='fondos'>

        
            <section className={`contact-form ${darkMode ? 'dark' : ''}`}>
                <article className="contact-header">
                    <h1>Contacta con nosotros!</h1>
                    <p>Si tienes alguna duda o consulta, no dudes en ponerte en contacto con nosotros a través del siguiente formulario:</p>
                </article>

                <article className="contact-form__body">
                    <form onSubmit={handleSubmit}>
                        <section className="contact-form__input-group">
                            <label htmlFor="nombre" className="contact-form__label">Nombre:</label>
                            <input
                                type="text"
                                id="nombre"
                                name="nombre"
                                value={nombre}
                                onChange={(e) => setNombre(e.target.value)}
                                className="contact-form__input"
                            />
                        </section>

                        <section className="contact-form__input-group">
                            <label htmlFor="email" className="contact-form__label">Email:</label>
                            <input
                                type="email"
                                id="email"
                                name="email"
                                value={email}
                                onChange={(e) => setEmail(e.target.value)}
                                className="contact-form__input"
                            />
                        </section>

                        <section className="contact-form__input-group">
                            <label htmlFor="mensaje" className="contact-form__label">Mensaje:</label>
                            <textarea
                                id="mensaje"
                                name="mensaje"
                                value={mensaje}
                                onChange={(e) => setMensaje(e.target.value)}
                                className="contact-form__textarea"
                            ></textarea>
                        </section>

                        <section className='contact-form__submit-container'>
                            <input type="submit" value="Enviar" className="contact-form__submit" disabled={loading} />
                        </section>
                       
                    </form>
                </article>


                {loading && <p className="contact-form__message">Enviando...</p>}
                {success && <p className="contact-form__message contact-form__message--success">{success}</p>}
                {error && <p className="contact-form__message contact-form__message--error">{error}</p>}
            </section>
        </section>
    );
}

export default Contacto;
