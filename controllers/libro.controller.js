// Importamos el modelo para poder interactuar con la base de datos
const Libro = require('../models/libro.model');

// --- Obtener todos los libros ---
exports.getLibros = async (req, res) => {
  try {
    const libros = await Libro.find();
    res.json(libros);
  } catch (error) {
    res.status(500).json({ message: 'Error al obtener los libros', error: error.message });
  }
};

// --- Crear un nuevo libro ---
exports.createLibro = async (req, res) => {
  try {
    const nuevoLibro = new Libro(req.body);
    const libroGuardado = await nuevoLibro.save();
    res.status(201).json(libroGuardado);
  } catch (error) {
    res.status(400).json({ message: 'Error al crear el libro', error: error.message });
  }
};

// --- Actualizar un libro existente ---
exports.updateLibro = async (req, res) => {
  try {
    // req.params.id viene de la URL (ej: /api/libros/ID_DEL_LIBRO)
    const libroActualizado = await Libro.findByIdAndUpdate(
      req.params.id, 
      req.body, 
      { new: true } // { new: true } devuelve el documento actualizado
    );
    if (!libroActualizado) {
      return res.status(404).json({ message: 'Libro no encontrado' });
    }
    res.json(libroActualizado);
  } catch (error) {
    res.status(400).json({ message: 'Error al actualizar el libro', error: error.message });
  }
};

// --- Eliminar un libro ---
exports.deleteLibro = async (req, res) => {
  try {
    const libroEliminado = await Libro.findByIdAndDelete(req.params.id);
     if (!libroEliminado) {
      return res.status(404).json({ message: 'Libro no encontrado' });
    }
    res.json({ message: 'Libro eliminado exitosamente' });
  } catch (error) {
    res.status(500).json({ message: 'Error al eliminar el libro', error: error.message });
  }
};