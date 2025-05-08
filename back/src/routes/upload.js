const express = require("express");
const multer = require("multer");
const path = require("path");
const fs = require("fs");
const router = express.Router();

// Configuración de almacenamiento con Multer
const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    // Determinamos la categoría basada en la ruta
    const categoria = req.originalUrl.split('/')[3];  // Obtenemos la categoría de la URL
    const categoriaBuena = categoria.split('-')[2];

    // Carpeta destino de acuerdo a la categoría
    const uploadPath = path.join(__dirname, "../../uploads", categoriaBuena);

     // Si la carpeta no existe, la creamos
    if (!fs.existsSync(uploadPath)) {
      fs.mkdirSync(uploadPath, { recursive: true });
    }

    
    cb(null, uploadPath);  // Usamos la carpeta correspondiente
  },
  filename: function (req, file, cb) {
    // Guardar con un nombre único basado en el timestamp
    cb(null, Date.now() + path.extname(file.originalname));  // Guarda con timestamp
  }
});

const upload = multer({ storage });

// Ruta para subir imágenes a la carpeta "tattoos"
router.post("/subir-imagen-tattoo", upload.single("imagen"), (req, res) => {
  if (!req.file) {
    return res.status(400).json({ mensaje: "No se ha subido ninguna imagen" });
  }
  res.json({
    mensaje: "Imagen de tatuaje subida con éxito",
    url: `/api/upload/uploads/tattoos/${req.file.filename}`
  });
});

// Ruta para subir imágenes a la carpeta "tattoos"
router.post("/subir-imagen-tattooAlex", upload.single("imagen"), (req, res) => {
  if (!req.file) {
    return res.status(400).json({ mensaje: "No se ha subido ninguna imagen" });
  }
  res.json({
    mensaje: "Imagen de tatuaje subida con éxito",
    url: `/api/upload/uploads/tattoos-alex/${req.file.filename}`
  });
});

// Ruta para subir imágenes a la carpeta "piercings"
router.post("/subir-imagen-piercing", upload.single("imagen"), (req, res) => {
  if (!req.file) {
    return res.status(400).json({ mensaje: "No se ha subido ninguna imagen" });
  }
  res.json({
    mensaje: "Imagen de piercing subida con éxito",
    url: `/api/upload/uploads/piercings/${req.file.filename}`
  });
});



// Ruta para subir imágenes a la carpeta "gemas"
router.post("/subir-imagen-gema", upload.single("imagen"), (req, res) => {
  if (!req.file) {
    return res.status(400).json({ mensaje: "No se ha subido ninguna imagen" });
  }
  res.json({
    mensaje: "Imagen de gema subida con éxito",
    url: `/api/upload/uploads/gemas/${req.file.filename}`
  });
});

// Servir imágenes de la carpeta `uploads`
router.use("/uploads", express.static(path.join(__dirname, "../../uploads")));

// Ruta para listar imágenes por categoría
router.get("/imagenes/:categoria", (req, res) => {
  const categoria = req.params.categoria;
  const validCategorias = ['tattoo', 'piercing', 'gema', 'tattooAlex'];
 

  if (!validCategorias.includes(categoria)) {
    return res.status(404).json({ mensaje: "Categoría no válida" });
  }

  const folderPath = path.join(__dirname, "../../uploads", categoria);

  if (!fs.existsSync(folderPath)) {
    return res.status(404).json({ mensaje: "No se encuentra la categoría" });
  }

  fs.readdir(folderPath, (err, files) => {
    if (err) {
      return res.status(500).json({ mensaje: "Error al leer la carpeta" });
    }

    const imageFiles = files.filter(file => /\.(jpg|jpeg|png|gif|webp)$/.test(file));

    if (imageFiles.length === 0) {
      return res.status(404).json({ mensaje: "No hay imágenes en esta categoría" });
    }

    const imageUrls = imageFiles.map(file => `/uploads/${categoria}/${file}`);

    res.json(imageUrls);
  });
});

router.post('/delete-image', (req, res) => {
  const { url } = req.body;

  if (!url) {
    return res.status(400).json({ error: "No se proporcionó la URL" });
  }

  // Extrae el path del archivo desde la URL
  const filePath = path.join(__dirname, '..','..', url.replace('http://localhost:4000', ''));

  // Verifica si el archivo existe y lo elimina
  fs.unlink(filePath, (err) => {
    if (err) {
      console.error("Error al eliminar el archivo:", err);
      return res.status(500).json({ error: "No se pudo eliminar el archivo" });
    }
    
    res.json({ message: "Imagen eliminada correctamente" });
  });
});

module.exports = router;
