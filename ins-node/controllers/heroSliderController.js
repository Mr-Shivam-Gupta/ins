// controllers/heroSliderController.js
const HeroSlider = require('../models/HeroSlider');

// GET all hero slider items
const getAllHeroSliders = async (req, res) => {
  try {
    const sliders = await HeroSlider.find().sort({ createdAt: -1 });
    res.json(sliders);
  } catch (err) {
    res.status(500).json({ error: 'Failed to fetch hero slider items' });
  }
};

// GET hero slider item by ID
const getHeroSliderById = async (req, res) => {
  try {
    const slider = await HeroSlider.findById(req.params.id);
    if (!slider) {
      return res.status(404).json({ error: 'Hero slider item not found' });
    }
    res.json(slider);
  } catch (err) {
    res.status(500).json({ error: 'Failed to fetch hero slider item' });
  }
};

// POST create hero slider item
const createHeroSlider = async (req, res) => {
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
};

// PUT update hero slider item
const updateHeroSlider = async (req, res) => {
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
};

// DELETE hero slider item
const deleteHeroSlider = async (req, res) => {
  try {
    const slider = await HeroSlider.findByIdAndDelete(req.params.id);
    if (!slider) {
      return res.status(404).json({ error: 'Hero slider item not found' });
    }
    res.json({ message: 'Hero slider item deleted successfully' });
  } catch (err) {
    res.status(500).json({ error: 'Failed to delete hero slider item' });
  }
};

module.exports = {
  getAllHeroSliders,
  getHeroSliderById,
  createHeroSlider,
  updateHeroSlider,
  deleteHeroSlider,
};