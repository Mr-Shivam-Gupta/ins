// routes/gallery.js
const express = require('express');
const router = express.Router();
const galleryController = require('../controllers/galleryController');

// GET all gallery items
router.get('/', galleryController.getAllGallery);

// GET gallery item by ID
router.get('/:id', galleryController.getGalleryById);

// POST create gallery item
router.post('/', galleryController.createGallery);

// PUT update gallery item
router.put('/:id', galleryController.updateGallery);

// DELETE gallery item
router.delete('/:id', galleryController.deleteGallery);

module.exports = router;