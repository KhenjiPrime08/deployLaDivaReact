import { useStripe, useElements, CardElement } from "@stripe/react-stripe-js";
import '../styles/Css/Stripe.css';
import { useContext, useState } from "react";
import { DarkModeContext } from "../context/DarkModeContext";
import API_URL from "../config/config";

function StripePago({ citaConfirmada }) {
  const stripe = useStripe();
  const elements = useElements();
  const { darkMode } = useContext(DarkModeContext);
  const [errores, setErrores] = useState({});
  const {cantidad, setCantidad } = useState(0);

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!stripe || !elements) {
      setErrores({ stripe: "Stripe no está cargado aún." });
      return;
    }

    switch (citaConfirmada.servicio) {
      case "tatuaje":
        setCantidad(20);
        break;
      case "piercing":
        setCantidad(10);
        break;
      case "gema_dental":
        setCantidad(10);
        break;
      default:
        setErrores({ stripe: "Servicio no válido." });
        return;
    }

    try {
      const { clientSecret } = await fetch(`${API_URL}/pagos/pagar`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          cantidad: cantidad,
          usuarioId: citaConfirmada.usuarioId,
          citaId: citaConfirmada.id, // este es el id de la CitaConfirmada
          servicio: citaConfirmada.servicio
        })
      }).then(res => res.json());

      const result = await stripe.confirmCardPayment(clientSecret, {
        payment_method: {
          card: elements.getElement(CardElement),
        },
      });

      if (result.error) {
        console.error("Error con el pago:", result.error.message);
        setErrores({ stripe: result.error.message });
      } else if (result.paymentIntent.status === "succeeded") {
        console.log("✅ Pago completado con éxito");
        // Aquí puedes hacer una llamada para actualizar el estado del pago o redirigir
      }

    } catch (error) {
      console.error("Error al procesar el pago:", error.message);
      setErrores({ stripe: "Hubo un error al procesar el pago." });
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
      <label className="label" htmlFor="card-element">Información de la tarjeta</label>
      <article className="tarjeta">
        <CardElement options={{ style }} />
      </article>

      {errores.stripe && <p className="error-message">{errores.stripe}</p>}

      <div className='boton-container'>
        <input
          type="submit"
          onClick={handleSubmit}
          className="boton"
          value={`Pagar ${citaConfirmada.cantidad || 20} €`}
        />
      </div>
    </section>
  );
}

export default StripePago;
