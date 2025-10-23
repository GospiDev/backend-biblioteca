const express = require('express');
const router = express.Router();

const prestamoController = require('../controllers/prestamo.controller');

router.get('/', prestamoController.getPrestamos);

router.post('/', prestamoController.createPrestamos);

router.put('/:id', prestamoController.updatePrestamo);

router.delete('/:id', prestamoController.deletePrestamo);

module.exports = router;