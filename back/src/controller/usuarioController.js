const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const User = require("../model/Usuario");
const { sendVerificationEmail, contactEmail } = require("../service/emailService");

exports.register = async (req, res) => {
  try {
    const { nombre, email, password } = req.body;
    const hashedPassword = await bcrypt.hash(password, 10);

    if (!nombre || !email || !password) {
      return res.status(400).json({ error: "Todos los campos son obligatorios" });
    }
      //CAMBIAR POR UN REGEX, SOLO PRUEBA DE MOMENTO
    if (password.length < 6) {
      return res.status(400).json({ error: "La contraseña debe tener al menos 6 caracteres" });
    }

    const existeUser = await User.findOne({where: { email } });
    if (existeUser){
      return res.status(400).json({ error: "El email ya está en uso" });
    }

    const verificationCode = Math.floor(100000 + Math.random() * 900000).toString(); //Crea el codigo de verificacion

    const user = await User.create({ 
      nombre, 
      email, 
      password: hashedPassword, 
      verificationCode,
      rol: email === process.env.EMAIL_ADMIN ? "admin" : undefined 
    }); //Crea el usuario, si el email es igual al del .env se le asigna admin, si no, 

    await sendVerificationEmail(email, verificationCode); //Envia el correo de verificacion

    res.status(201).json({ message: "Usuario registrado con éxito", user });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};


exports.login = async (req, res) => {
  try {
    const { email, password } = req.body;
    const user = await User.findOne({ where: { email } });

    if (!user) return res.status(404).json({ error: "Usuario no encontrado" });
    if (!user.verified) return res.status(400).json({ error: "Verifica tu correo antes de iniciar sesión" });

    const isPasswordValid = await bcrypt.compare(password, user.password);
    if (!isPasswordValid) return res.status(400).json({ error: "Credenciales incorrectas" });

    const token = jwt.sign({ id: user.id, rol: user.rol }, process.env.JWT_SECRET);
    console.log(user.role)
    res.json({ token, user });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};


exports.verifyEmail = async (req, res) => {
  try {
    const { email, codigo } = req.body;
    const user = await User.findOne({ where: { email } });

    if (!user) return res.status(404).json({ error: "Usuario no encontrado" });
    if (user.verified) return res.status(400).json({ error: "El usuario ya está verificado" });

    if (String(user.verificationCode) !== String(codigo)) {
      return res.status(400).json({ error: "Código incorrecto" });
    }

    user.verified = true;
    user.verificationCode = null; // 🔹 Limpiar el código
    await user.save();
    
    const token = jwt.sign({ id: user.id, rol: user.rol }, process.env.JWT_SECRET);
   
    res.json({ token, user });

  } catch (error) {
    res.status(500).json({ error: error.message });
    console.log(error.message);
  }
};

exports.actualizarUser = async (req, res) => {

  try {
    const { nombre, email, password } = req.body;
    const { id } = req.params;
    
    console.log("ID", id);
    const usuario = await User.findByPk(id);

    if(!usuario) {
      return res.status(404).json({ error: "Usuario no encontrado" });
    }

    if (!nombre || !email || !password) {
      return res.status(400).json({ error: "Todos los campos son obligatorios" });
    }

    if (password.length < 6) {
      return res.status(400).json({ error: "La contraseña debe tener al menos 6 caracteres" });
    }


    const verificationCode = Math.floor(100000 + Math.random() * 900000).toString(); //Crea el codigo de verificacion
    await sendVerificationEmail(email, verificationCode); //Envia el correo de verificacion


    //ACTUALIZAR USUARIO
    usuario.nombre = nombre;
    usuario.email = email;
    usuario.verified = false; // 🔹 Marcar como no verificado para cambiar a verificado en la autenticacion en dos pasos
    usuario.verificationCode = verificationCode; // 🔹 Agregar el nuevo codigo de verificacion

    const hashedPassword = await bcrypt.hash(password, 10);
    usuario.password = hashedPassword;

    await usuario.save();

    res.status(200).json({ message: "Usuario registrado con éxito", usuario});


  } catch (error) {
    console.error(error.message);
    res.status(500).json({ error: error.message });
    console.log("ERROR ACTUALIZANDO USER", error.message);
  }

};

exports.buscarUser = async (req, res) => {
  try{

    const { id } = req.params;
    
    const usuario = await User.findByPk(id);

    if(!usuario) {
      return res.status(404).json({ error: "Usuario no encontrado" });
    }

    res.status(200).json({ message: "Usuario encontrado con éxito", usuario});
  }catch(error){
    console.error(error.message);
    res.status(500).json({message: error.message})
    console.log("ERROR GET USER", error.message);
  }
}


exports.borrarUser = async (req, res) => {
  try{
    const { id } = req.params;

    const usuario = await User.findByPk(id);

    if(!usuario){
      return res.status(400).json({ error: "Usuario no encontrado"});
    }

    await usuario.destroy(); //Sequelize usa destroy para borrar usuarios en la bdd

    res.status(200).json( {message: "Cuenta eliminada con exito"});
  }catch(error){
    console.error("Error al eliminar cuenta", error)
    res.status(500).json({error: "Error interno eliminando"})
  }
}

exports.contact = async (req, res) => {
  const { email, nombre, mensaje } = req.body;

  try {
    await contactEmail(email, nombre, mensaje); // Llama a la función de envío de correo


    return res.status(200).json('Mensaje enviado con éxito'); // Responde al cliente
  } catch (error) {
    console.error('Error al enviar el mensaje:', error);
    res.status(500).json('Hubo un error al enviar el mensaje');
  }
};