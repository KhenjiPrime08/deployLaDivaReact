const stripe = require("stripe")(process.env.STRIPE_SECRET_KEY);
const CitaConfirmada  = require("../model/CitaConfirmada"); 
const Pagos  = require("../model/Pagos"); 

exports.stripeWebhook = async (req, res) => {
  const sig = req.headers["stripe-signature"];

  let event;
  try {
    event = stripe.webhooks.constructEvent(req.body, sig, process.env.STRIPE_WEBHOOK_SECRET);
  } catch (err) {
    console.error("Ha habido un error en la verificacion de la firma:", err.message);
    return res.status(400).send(`Webhook Error: ${err.message}`);
  }

  if (event.type === "payment_intent.succeeded") {
    const paymentIntent = event.data.object;
    const { usuarioId, citaId, servicio } = paymentIntent.metadata;

    try {
      await Pagos.create({
        usuarioId,
        citaId,
        servicio,
        stripeSessionId: paymentIntent.id,
        cantidad: paymentIntent.amount / 100,
        estado: "completado",
      });

      await CitaConfirmada.update(
        { estado: "pagada" },
        { where: { citaId } }
      );
    } catch (err) {
      console.error("Error guardando pago:", err);
      return res.status(500).send("Error interno");
    }
  }

  res.status(200).send("Evento recibido");
};
