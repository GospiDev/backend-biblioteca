const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
require('dotenv').config();

const app = express();
const PORT = process.env.PORT || 3000;

// Middlewares
app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Conexión a MongoDB
mongoose.connect(process.env.MONGODB_URI)
  .then(() => {
    console.log('✅ Conectado a MongoDB Atlas exitosamente');
  })
  .catch((error) => {
    console.error('❌ Error conectando a MongoDB:', error);
  });

// --- Rutas de Estado y Bienvenida ---
app.get('/', (req, res) => {
  res.json({ message: 'Servidor de la Biblioteca funcionando' });
});

app.get('/api/health', (req, res) => {
  res.json({ 
    status: 'OK',
    database: mongoose.connection.readyState === 1 ? 'connected' : 'disconnected'
  });
});


// --- Conectar Rutas de la API ---

// Conectamos SOLAMENTE las rutas de los libros, que son las que existen.
const libroRoutes = require('./routes/libro.routes');
app.use('/api/libros', libroRoutes);

// Toda la lógica de usuarios se ha eliminado de aquí.


// Iniciar servidor
app.listen(PORT, () => {
  console.log(`🚀 Servidor ejecutándose en puerto ${PORT}`);
});