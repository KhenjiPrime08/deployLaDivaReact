const express = require("express");
const cors = require("cors");
const db = require("./config/db");
const authRoutes = require("./routes/auth");

const app = express();
app.use(cors());
app.use(express.json());

app.use("/auth", authRoutes);

db.sync().then(() => console.log("✅ Base de datos sincronizada"));

app.listen(4000, () => console.log("🚀 Servidor corriendo en http://localhost:4000"));
