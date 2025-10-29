const Usuario = require('../models/usuario.model');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');

exports.login = async (req, res) => {
  try {
    const { correo, password } = req.body;

    const usuario = await Usuario.findOne({ correo: correo });
    if (!usuario) {
      return res.status(404).json({ message: 'Usuario no encontrado' });
    }

    const isMatch = await bcrypt.compare(password, usuario.password);
    if (!isMatch) {
      return res.status(400).json({ message: 'Contraseña incorrecta' });
    }

    const payload = {
      id: usuario._id,
      rol: usuario.rol
    };

    const token = jwt.sign(
      payload,
      process.env.JWT_SECRET,
      { expiresIn: '1d' } 
    );

    res.json({ token });

  } catch (error) {
    res.status(500).json({ message: 'Error en el servidor', error: error.message });
  }
};