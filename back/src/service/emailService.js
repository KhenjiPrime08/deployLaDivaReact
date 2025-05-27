const nodemailer = require("nodemailer");

const transporter = nodemailer.createTransport({
  service: "Gmail",
  auth: {
    user: process.env.EMAIL_USER, // Tu email
    pass: process.env.EMAIL_PASS  // Contraseña de aplicación (NO la normal)
  }
});

/**
 * Envía un correo de verificación con un código OTP.
 * @param {string} email - Correo del usuario.
 * @param {string} code - Código OTP.
 */
exports.sendVerificationEmail = async (email, code) => {
  try {
    await transporter.sendMail({
      from: `"La Diva Tattoo" <${process.env.EMAIL_USER}>`,
      to: email,
      subject: "Verifica tu cuenta",
      text: `Tu código de verificación es: ${code}`,
      html: `<p>Tu código de verificación es: <strong>${code}</strong></p>`
    });
  } catch (error) {
    console.error("Error enviando correo:", error);
  }
};

exports.contactEmail = async (email, nombre, mensaje) => {

  try {
    await transporter.sendMail({
      from: email, // El correo de quien envía el mensaje (usuario)
      to: process.env.EMAIL_RECEIVER, // Correo al que se enviarán los mensajes (empresa)
      subject: `Nuevo mensaje de ${nombre}`, // Asunto del correo
      text: `Nombre: ${nombre}\nEmail: ${email}\n\nMensaje:\n${mensaje}`, // Cuerpo del mensaje
    });
  } catch (error) {
    console.error('Error al enviar el mensaje:', error);
  }
};


exports.contactClient = async (email, nombre, fecha, horaInicio, horaFin) => {

  const asunto = 'Tu cita ha sido confirmada';
  const mensaje = `
    <h2>¡Hola ${nombre}!</h2>
    <p>Tu cita ha sido confirmada para el día <strong>${fecha}</strong> desde <strong>${horaInicio}</strong> hasta <strong>${horaFin}</strong>.</p>
    <p>Por favor, entra a tu perfil para <strong>aceptarla</strong> o <strong>rechazarla</strong> según tu disponibilidad.</p>
    <br />
    <p>Gracias por confiar en nosotros.</p>
    <p>La Diva Tattoo</p>
  `;

  try {
    await transporter.sendMail({
      from: process.env.EMAIL_USER, // El correo de quien envía el mensaje (empresa)
      to: email, // Correo al que se enviarán los mensajes (usuario)
      subject: asunto, // Asunto del correo
      html: mensaje, // Cuerpo del mensaje en html para que sea mas bonito
    });
  } catch (error) {
    console.error('Error al enviar el mensaje:', error);
  }
}
