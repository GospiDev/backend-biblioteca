const Prestamo = require('../models/prestamo.model');
const Usuario = require('../models/usuario.model');

exports.getPrestamos = async (req, res) => {
  try {
    const prestamos = await Prestamo.find()
      .populate('usuario')
      .populate('libro');
    res.json(prestamos);
  } catch (error) {
    res.status(500).json({ message: 'Error al obtener los prestamos', error: error.message });
  }
};

exports.createPrestamo = async (req, res) => {
  try {
    const { usuario: usuarioId, libro: libroId } = req.body;

    const usuario = await Usuario.findById(usuarioId);

    if (!usuario) {
      return res.status(404).json({ message: 'Usuario no encontrado' });
    }

    if (usuario.situacion === 'Atrasado' || usuario.situacion === 'Bloqueado') {
      return res.status(403).json({
        message: `El usuario ${usuario.nombre} está ${usuario.situacion} y no puede pedir préstamos.`
      });
    }
    
    const nuevoPrestamo = new Prestamo(req.body);
    const prestamoGuardado = await nuevoPrestamo.save();

    usuario.situacion = 'Préstamo Activo';
    await usuario.save();

    const prestamoPopulado = await Prestamo.findById(prestamoGuardado._id)
      .populate('usuario')
      .populate('libro');

    res.status(201).json(prestamoPopulado);

  } catch (error) {
    res.status(400).json({ message: 'Error al crear el prestamo', error: error.message });
  }
};

exports.updatePrestamo = async (req, res) => {
  try {
    const prestamoActualizado = await Prestamo.findByIdAndUpdate(
      req.params.id, 
      req.body, 
      { new: true }
    ).populate('usuario').populate('libro');
    if (!prestamoActualizado) {
      return res.status(404).json({ message: 'Prestamo no encontrado' });
    }
    res.json(prestamoActualizado);
  } catch (error) {
    res.status(400).json({ message: 'Error al actualizar el prestamo', error: error.message });
  }
};

exports.deletePrestamo = async (req, res) => {
  try {
    const prestamoEliminado = await Prestamo.findByIdAndDelete(req.params.id);
     if (!prestamoEliminado) {
      return res.status(404).json({ message: 'Prestamo no encontrado' });
    }
    res.json({ message: 'Prestamo eliminado exitosamente' });
  } catch (error) {
    res.status(500).json({ message: 'Error al eliminar el prestamo', error: error.message });
  }
};