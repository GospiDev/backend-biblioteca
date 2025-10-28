const Prestamo = require('../models/prestamo.model');

exports.getPrestamos = async (req, res) => {
  try {
    const prestamos = await Prestamo.find();
    res.json(prestamos);
  } catch (error) {
    res.status(500).json({ message: 'Error al obtener los prestamos', error: error.message });
  }
};

exports.createPrestamos = async (req, res) => {
  try {
    const nuevoPrestamo = new Prestamo(req.body);
    const prestamoGuardado = await nuevoPrestamo.save();
    res.status(201).json(prestamoGuardado);
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
    );
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