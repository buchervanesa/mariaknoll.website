const express = require('express');
const mongoose = require('mongoose');
const multer = require('multer');
const path = require('path');

const app = express();
const PORT = process.env.PORT || 4000;

// Conexión a la base de datos MongoDB
mongoose.connect('mongodb+srv://buchervanesa:E90DkB0PTymNnIAc@prueba.lfe6lc8.mongodb.net/?retryWrites=true&w=majority&appName=prueba', {
    useNewUrlParser: true,
    useUnifiedTopology: true
});
const db = mongoose.connection;
db.on('error', console.error.bind(console, 'Error de conexión a MongoDB:'));
db.once('open', () => {
    console.log('Conexión exitosa a MongoDB');
});

// Definir el esquema y modelo de producto
const productoSchema = new mongoose.Schema({
    categoria: String,
    nombre: String,
    precio: Number,
    imagen: String
});
const Producto = mongoose.model('Producto', productoSchema);

// Configuración de Multer para subir imágenes
const storage = multer.diskStorage({
    destination: './public/uploads/',
    filename: function (req, file, cb) {
        cb(null, file.fieldname + '-' + Date.now() + path.extname(file.originalname));
    }
});
const upload = multer({ storage });

// Middleware para servir archivos estáticos
app.use(express.static('public'));

// Ruta para la creación de productos
app.post('/api/productos', upload.single('imagen'), async (req, res) => {
    const { categoria, nombre, precio } = req.body;
    const imagen = req.file.filename;

    try {
        const nuevoProducto = new Producto({ categoria, nombre, precio, imagen });
        await nuevoProducto.save();
        res.status(201).json({ message: 'Producto creado exitosamente' });
    } catch (error) {
        console.error('Error al crear el producto:', error);
        res.status(500).json({ message: 'Error interno del servidor' });
    }
});

// Iniciar el servidor
app.listen(PORT, () => {
    console.log(`Servidor escuchando en http://localhost:${PORT}`);
});
