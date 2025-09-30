// routes/heroSlider.js
const express = require('express');
const router = express.Router();
const heroSliderController = require('../controllers/heroSliderController');

// GET all hero slider items
router.get('/', heroSliderController.getAllHeroSliders);

// GET hero slider item by ID
router.get('/:id', heroSliderController.getHeroSliderById);

// POST create hero slider item
router.post('/', heroSliderController.createHeroSlider);

// PUT update hero slider item
router.put('/:id', heroSliderController.updateHeroSlider);

// DELETE hero slider item
router.delete('/:id', heroSliderController.deleteHeroSlider);

module.exports = router;