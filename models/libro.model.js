const mongoose = require('mongoose');

const libroSchema = new mongoose.Schema({
  titulo: {
    type: String,
    required: [true, 'El título es obligatorio']
  },
  autor: {
    type: String,
    required: [true, 'El autor es obligatorio']
  },
  genero: {
    type: String,
    default: 'No especificado'
  },
  ano: {
    type: Number
  }
}, {
  timestamps: true 
});

const Libro = mongoose.model('Libro', libroSchema);

module.exports = Libro;