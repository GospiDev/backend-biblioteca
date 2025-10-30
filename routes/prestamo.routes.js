const express = require('express');
const router = express.Router();

const prestamoController = require('../controllers/prestamo.controller');

router.get('/', prestamoController.getPrestamos);

router.post('/', prestamoController.createPrestamo);

router.put('/:id', prestamoController.updatePrestamo);

router.delete('/:id', prestamoController.deletePrestamo);

router.delete('/corregir/:id', prestamoController.borrarPrestamoPorError);

router.get('/historial', prestamoController.getHistorial);

module.exports = router;