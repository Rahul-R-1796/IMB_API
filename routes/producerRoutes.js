const express = require('express');
const router = express.Router();
const producerController = require('../controllers/producerController');

// Routes
router.get('/', producerController.getAllProducer);
router.post('/', producerController.createProducer);
router.put('/:id', producerController.updateProducer);
router.delete('/:id', producerController.deleteProducer);

module.exports = router;
