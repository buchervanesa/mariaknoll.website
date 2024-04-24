const express = require("express");
const mongoose = require("mongoose");
const multer = require("multer");
const fs = require("fs");
const path = require("path");

const productoSchema = new mongoose.Schema({
  categoria: { type: String, required: true },
  nombre: { type: String, required: true },
  precio: { type: Number, required: true },
  imagenes: [{ type: String }],
});

const Producto = mongoose.model("Categoria", productoSchema);

const app = express();

// Conexión a la base de datos MongoDB
mongoose
  .connect("mongodb://localhost:27017/tu_base_de_datos", { useNewUrlParser: true, useUnifiedTopology: true })
  .then(() => console.log("Conexión a la base de datos establecida"))
  .catch((err) => console.error("Error al conectar a la base de datos:", err));

// Configura Multer para manejar la subida de imágenes
const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    const uploadDir = "public/uploads/";
    // Verifica si la carpeta de destino existe, si no, la crea
    if (!fs.existsSync(uploadDir)) {
      fs.mkdirSync(uploadDir, { recursive: true });
    }
    cb(null, uploadDir);
  },
  filename: function (req, file, cb) {
    cb(null, Date.now() + "-" + file.originalname);
  },
});
const upload = multer({ storage: storage });

// Middleware para parsear el cuerpo de las solicitudes en formato JSON
app.use(express.json());
app.use(express.static("public"));

// ========== login... ==========
app.use(express.urlencoded({ extended: true }));
const users = [{ username: "fgp555", password: "Electron5.pe" }];

app.get("/admin", (req, res) => {
  res.sendFile(__dirname + "/private/login.html");
});

app.post("/admin", (req, res) => {
  const { username, password } = req.body;
  const user = users.find((u) => u.username === username && u.password === password);
  if (user) {
    const adminPath = path.join(__dirname, "private", "admin.html");
    res.sendFile(adminPath);
  } else {
    res.send("Login failed");
  }
});
// ========== login. ==========

// Ruta para obtener todas las categorías
app.get("/productos", async (req, res) => {
  try {
    const categorias = await Producto.find();
    res.status(200).json(categorias);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Error al obtener las categorías" });
  }
});

// Ruta para eliminar una categoría por su ID
app.delete("/productos/:id", async (req, res) => {
  try {
    const id = req.params.id;
    const categoriaEliminada = await Producto.findByIdAndDelete(id);
    if (!categoriaEliminada) {
      return res.status(404).json({ error: "Categoría no encontrada" });
    }
    res.status(200).json({ mensaje: "Categoría eliminada con éxito" });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Error al eliminar la categoría" });
  }
});

// Ruta para actualizar una categoría por su ID
app.put("/productos/:id", async (req, res) => {
  try {
    const id = req.params.id;
    const { categoria, nombre, precio } = req.body;
    const categoriaActualizada = await Producto.findByIdAndUpdate(id, { categoria, nombre, precio }, { new: true });
    if (!categoriaActualizada) {
      return res.status(404).json({ error: "Categoría no encontrada" });
    }
    res.status(200).json(categoriaActualizada);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Error al actualizar la categoría" });
  }
});

// Ruta para manejar el formulario de categoría
app.post("/productos/crear", upload.array("imagenes"), async (req, res) => {
  try {
    // Extrae los campos del formulario
    const { categoria, nombre, precio } = req.body;

    // Crea una nueva categoría en la base de datos
    const nuevaCategoria = new Producto({
      categoria,
      nombre,
      precio,
      imagenes: req.files.map((file) => file.filename), // Guarda los nombres de las imágenes
    });

    // Guarda la nueva categoría en la base de datos
    await nuevaCategoria.save();

    res.status(201).json({ mensaje: "Categoría creada con éxito" });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Error al crear la categoría" });
  }
});

// Ruta para obtener solo las categorías según la opción proporcionada
app.get("/productos/:categoria", async (req, res) => {
  try {
    // Obtiene la opción proporcionada desde los parámetros de la ruta
    const categoria = req.params.categoria;

    // Consulta la base de datos para encontrar las categorías según la opción proporcionada
    const categorias = await Producto.find({ categoria: categoria });

    // Envía las categorías encontradas como respuesta
    res.status(200).json(categorias);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Error al obtener las categorías" });
  }
});

// Puerto en el que escucha el servidor
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`Servidor corriendo en el puerto ${PORT}`);
});
