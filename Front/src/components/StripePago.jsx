import { useStripe, useElements, CardElement } from "@stripe/react-stripe-js";
import '../styles/Css/Stripe.css';
import { useContext, useState, useEffect } from "react";
import { DarkModeContext } from "../context/DarkModeContext";
import API_URL from "../config/config";

function StripePago({ citaConfirmada, modalPago, cerrarModal}) {
  const stripe = useStripe();
  const elements = useElements();
  const { darkMode } = useContext(DarkModeContext);
  const [errores, setErrores] = useState({});
  const [cantidad, setCantidad] = useState(0);
  const [ pagoCorrecto, setPagoCorrecto ]  = useState("");
  const [pagoConfirmado, setPagoConfirmado ] = useState(false);

  // Calcular la cantidad una vez que carga la cita

  useEffect(() => {
    switch (citaConfirmada.servicio) {
      case "tatuaje":
        setCantidad(0.1);
        break;
      case "piercing":
        setCantidad(0.1);
        break;
      case "gema_dental":
        setCantidad(0.1);
        break;
      default:
        setErrores({ stripe: "Servicio no válido." });
    }
  }, [citaConfirmada.servicio]);

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!stripe || !elements) {
      setErrores({ stripe: "Stripe no está cargado aún." });
      return;
    }

    try {
      const response = await fetch(`${API_URL}/stripe/pagar/${citaConfirmada.id}`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          cantidad,
          usuarioId: citaConfirmada.usuarioIdCita,
          citaId: citaConfirmada.id,
          servicio: citaConfirmada.servicio
        })
      });

      const { clientSecret } = await response.json();

      const result = await stripe.confirmCardPayment(clientSecret, {
        payment_method: {
          card: elements.getElement(CardElement),
        },
      });

      if (result.error) {
        console.error("Error con el pago:", result.error.message);
        setErrores({ stripe: result.error.message });
      } else if (result.paymentIntent.status === "succeeded") {
        setPagoCorrecto("Pago completado con éxito");
        setPagoConfirmado(true);
        cerrarModal(true)
      }

    } catch (error) {
      console.error("Error al procesar el pago:", error.message);
      setErrores({ stripe: "Hubo un error al procesar el pago." });
      setPagoConfirmado(false);
    }
  };

  const style = {
    base: {
      color: "#000",
      fontFamily: '"Roboto", sans-serif',
      fontSize: "16px",
      iconColor: "#000",
      fontSmoothing: "antialiased",
      "::placeholder": { color: "#272727" },
    },
    invalid: { color: "#fa755a", iconColor: "#fa755a" },
    complete: { color: "#4bdb6d", iconColor: "#4bdb6d" }
  };

  return (
    <section className={`stripe-container2 ${darkMode ? 'dark' : ''}`}>
      <form onSubmit={handleSubmit}>
        <label className="label" htmlFor="card-element">
          Información de la tarjeta
        </label>
        <article className="tarjeta">
          <CardElement id="card-element" options={{ style }} />
        </article>

        {errores.stripe && <p className="error-message">{errores.stripe}</p>}

        <section className="boton-container">
          <input type="submit" className="boton" value={`Pagar ${cantidad} €`} />
          <input
            type="button"
            className="boton cancelar"
            value={"Cancelar"}
            onClick={() => modalPago(false)}
          />
        </section>

        <article>
          <p>Lo que se está pagando es un adelanto para asegurar la asistencia y reserva a la cita</p>

          <article className="confirmado">
            {pagoConfirmado && pagoCorrecto}
          </article>
          
        </article>
      </form>
    </section>
  );
}

export default StripePago;
