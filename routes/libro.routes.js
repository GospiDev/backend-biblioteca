const express = require('express');
const router = express.Router();

// Importamos el controlador para asociar las rutas con su lógica
const libroController = require('../controllers/libro.controller');

// GET /api/libros -> Obtener todos los libros
router.get('/', libroController.getLibros);

// POST /api/libros -> Crear un nuevo libro
router.post('/', libroController.createLibro);

// PUT /api/libros/:id -> Actualizar un libro por su ID
router.put('/:id', libroController.updateLibro);

// DELETE /api/libros/:id -> Eliminar un libro por su ID
router.delete('/:id', libroController.deleteLibro);

module.exports = router;