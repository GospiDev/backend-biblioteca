const mongoose = require('mongoose');

const prestamoSchema = new mongoose.Schema({
  usuario: {
    type: String,
    required: [true, 'El usuario/rut es obligatorio']
  },
  libro: {
    type: String,
    required: [true, 'El nombre del libro es obligatorio']
  },
  fechaPrestamo: {
    type: Number
  },
  fechaDevolucion: {
    type: Number
  }}, 
{
  timestamps: true 
});

const Prestamo = mongoose.model('Prestamo', prestamoSchema);

module.exports = Prestamo;