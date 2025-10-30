const Prestamo = require('../models/prestamo.model');
const Usuario = require('../models/usuario.model');
const Libro = require('../models/libro.model');

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

    const libro = await Libro.findById(libroId);
    if (!libro) {
      return res.status(404).json({ message: 'Libro no encontrado' });
    }
    if (libro.cantidad === 0) {
      return res.status(400).json({ 
        message: `No quedan copias disponibles de "${libro.titulo}"` 
      });
    }

    const nuevoPrestamo = new Prestamo(req.body);
    await nuevoPrestamo.save();

    usuario.situacion = 'Prestamo Activo';
    await usuario.save();
    libro.cantidad -= 1;
    await libro.save();

    const prestamoPopulado = await Prestamo.findById(nuevoPrestamo._id).populate('usuario').populate('libro');
    res.status(201).json(prestamoPopulado);

  } catch (error) {
    res.status(400).json({ message: 'Error al crear el prestamo', error: error.message });
  }
};

exports.deletePrestamo = async (req, res) => {
  try {
    const prestamo = await Prestamo.findById(req.params.id);
    if (!prestamo) {
      return res.status(404).json({ message: 'Prestamo no encontrado' });
    }
    
    const usuarioId = prestamo.usuario;
    const libroId = prestamo.libro;

    await Prestamo.findByIdAndDelete(req.params.id);

    await Libro.findByIdAndUpdate(libroId, { $inc: { cantidad: 1 } });

    res.json({ message: 'Préstamo devuelto y libro re-abastecido' });
  } catch (error) {
    res.status(500).json({ message: 'Error al eliminar el prestamo', error: error.message });
  }
};

exports.updatePrestamo = async (req, res) => {
  try {
    const prestamoActualizado = await Prestamo.findByIdAndUpdate(
      req.params.id, 
      req.body, 
      { new: true } 
    )
    .populate('usuario')
    .populate('libro');

    if (!prestamoActualizado) {
      return res.status(404).json({ message: 'Prestamo no encontrado' });
    }
    
    res.json(prestamoActualizado);
    
  } catch (error) {
    res.status(400).json({ message: 'Error al actualizar el prestamo', error: error.message });
  }
};