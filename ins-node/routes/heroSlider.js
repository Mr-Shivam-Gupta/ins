// routes/heroSlider.js
const express = require('express');
const router = express.Router();
const HeroSlider = require('../models/HeroSlider');

// GET all hero slider items
router.get('/', async (req, res) => {
  try {
    const sliders = await HeroSlider.find().sort({ createdAt: -1 });
    res.json(sliders);
  } catch (err) {
    res.status(500).json({ error: 'Failed to fetch hero slider items' });
  }
});

// GET hero slider item by ID
router.get('/:id', async (req, res) => {
  try {
    const slider = await HeroSlider.findById(req.params.id);
    if (!slider) {
      return res.status(404).json({ error: 'Hero slider item not found' });
    }
    res.json(slider);
  } catch (err) {
    res.status(500).json({ error: 'Failed to fetch hero slider item' });
  }
});

// POST create hero slider item
router.post('/', async (req, res) => {
  try {
    const slider = new HeroSlider(req.body);
    await slider.save();
    res.status(201).json(slider);
  } catch (err) {
    if (err.name === 'ValidationError') {
      return res.status(400).json({ error: err.message });
    }
    res.status(500).json({ error: 'Failed to create hero slider item' });
  }
});

// PUT update hero slider item
router.put('/:id', async (req, res) => {
  try {
    const slider = await HeroSlider.findByIdAndUpdate(
      req.params.id,
      req.body,
      { new: true, runValidators: true }
    );
    if (!slider) {
      return res.status(404).json({ error: 'Hero slider item not found' });
    }
    res.json(slider);
  } catch (err) {
    if (err.name === 'ValidationError') {
      return res.status(400).json({ error: err.message });
    }
    res.status(500).json({ error: 'Failed to update hero slider item' });
  }
});

// DELETE hero slider item
router.delete('/:id', async (req, res) => {
  try {
    const slider = await HeroSlider.findByIdAndDelete(req.params.id);
    if (!slider) {
      return res.status(404).json({ error: 'Hero slider item not found' });
    }
    res.json({ message: 'Hero slider item deleted successfully' });
  } catch (err) {
    res.status(500).json({ error: 'Failed to delete hero slider item' });
  }
});

module.exports = router;