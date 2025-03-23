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
    console.log(`Correo enviado a ${email}`);
  } catch (error) {
    console.error("Error enviando correo:", error);
  }
};
