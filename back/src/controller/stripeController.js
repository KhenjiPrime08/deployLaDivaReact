const { Pago, CitaConfirmada } = require('../model');
const stripe = require('stripe')(process.env.STRIPE_SECRET_KEY);

exports.pagar = async (req, res) => {
    try {
        const { cantidad, usuarioId, citaId, servicio } = req.body;
    
        const paymentIntent = await stripe.paymentIntents.create({
          amount: Math.round(cantidad * 100), // en céntimos
          currency: "eur",
          metadata: {
            usuarioId,
            citaId,
            servicio
          }
        });

        // Actualiza estado en cita confirmada
        await CitaConfirmada.update(
          { estado: "confirmada" },
          { where: { citaId } }
        );

        res.send({ clientSecret: paymentIntent.client_secret });
      } catch (error) {
        console.error("Error creando PaymentIntent:", error);
        res.status(500).json({ error: "Error creando pago" });
      }
}
  
