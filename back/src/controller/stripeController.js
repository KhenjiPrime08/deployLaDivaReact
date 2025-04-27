const { Pago } = require('../model');
const stripe = require('stripe')(process.env.STRIPE_SECRET_KEY);

// pagosController.js
exports.crearPago = async (req, res) => {
    try {
      const { usuarioId, citaId, servicio, stripeSessionId, cantidad } = req.body;
  
      const pago = await Pago.create({
        usuarioId,
        citaId,
        servicio,
        stripeSessionId,
        cantidad,
        estado: "completado", // lo puedes cambiar si usas Webhooks
      });
  
      // Actualiza estado en cita confirmada
      await CitaConfirmada.update(
        { estado: "confirmada" },
        { where: { citaId } }
      );
  
      res.status(201).json(pago);
    } catch (error) {
      console.error("Error registrando pago:", error);
      res.status(500).json({ error: "Error al registrar el pago" });
    }
};


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
    
        res.send({ clientSecret: paymentIntent.client_secret });
      } catch (error) {
        console.error("Error creando PaymentIntent:", error);
        res.status(500).json({ error: "Error creando pago" });
      }
}
  
