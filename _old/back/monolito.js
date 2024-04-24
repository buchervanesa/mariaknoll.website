const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const multer = require('multer');
const path = require('path');

const app = express();
const PORT = process.env.PORT || 5000;

// Configuración de Multer para manejar la carga de archivos
const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, 'uploads/');
  },
  filename: function (req, file, cb) {
    cb(null, file.fieldname + '-' + Date.now() + path.extname(file.originalname));
  }
});
const upload = multer({ storage: storage });

// Model
const Vestido = mongoose.model('Vestido', new mongoose.Schema({
  categoria: { type: String, required: true },
  nombre: { type: String, required: true },
  precio: { type: Number, required: true },
  imagen: { type: String, required: true },
}));

// Middleware
app.use(express.json());
app.use(cors({
  origin: 'http://127.0.0.1:5501',
}));

// Routes
app.get('/api/vestidos', async (req, res) => {
  try {
    const vestidos = await Vestido.find();
    res.status(200).json(vestidos);
  } catch (error) {
    console.error('Error al obtener los vestidos:', error);
    res.status(500).json({ error: 'Error al obtener los vestidos' });
  }
});

app.post('/api/vestidos', upload.single('imagen'), async (req, res) => {
  try {
    const { categoria, nombre, precio } = req.body;
    const imagen = req.file.filename;

    const newVestido = new Vestido({ categoria, nombre, precio, imagen });
    await newVestido.save();
    res.status(201).json({ message: 'Vestido creado exitosamente', newVestido });
  } catch (error) {
    console.error('Error al crear el vestido:', error);
    res.status(500).json({ error: 'Error al crear el vestido' });
  }
});

app.delete('/api/vestidos/:id', async (req, res) => {
  try {
    const vestidoId = req.params.id;
    const deletedVestido = await Vestido.findByIdAndDelete(vestidoId);
    if (!deletedVestido) {
      return res.status(404).json({ error: 'Vestido no encontrado' });
    }
    res.status(200).json({ message: 'Vestido eliminado exitosamente', deletedVestido });
  } catch (error) {
    console.error('Error al eliminar el vestido:', error);
    res.status(500).json({ error: 'Error al eliminar el vestido' });
  }
});

app.get("/:filename", (req, res) => {
  const filename = req.params.filename;
  const filePath = `uploads/${filename}`;
  res.sendFile(path.join(__dirname, filePath));
});

// Connect to database
mongoose.connect('mongodb+srv://buchervanesa:E90DkB0PTymNnIAc@prueba.lfe6lc8.mongodb.net/?retryWrites=true&w=majority&appName=prueba', {
  useNewUrlParser: true,
  useUnifiedTopology: true,
}).then(() => {
  console.log('Conexión a la base de datos establecida');
  // Start server
  app.listen(PORT, () => {
    console.log(`Servidor escuchando en el puerto ${PORT}`);
  });
}).catch((error) => {
  console.error('Error al conectar la base de datos:', error);
  process.exit(1);
});