const mongoose = require('mongoose');

const usuarioSchema = new mongoose.Schema({
  nombre: {
    type: String,
    required: [true, 'El nombre es obligatorio']
  },
  correo: {
    type: String,
    required: [true, 'El correo es obligatorio']
  },
  rut: {
    type: String,
    required: [true, 'El rut es obligatorio']
  },
  situacion: {
    type: String,
    enum: ['Vigente','Atrasado','Bloqueado'],
    default: 'Vigente'
  }
}, 
{
  timestamps: true 
});

const Usuario = mongoose.model('Usuario', usuarioSchema);

module.exports = Usuario;