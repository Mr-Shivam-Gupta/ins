// routes/contact.js
const express = require('express');
const router = express.Router();
const contactController = require('../controllers/contactController');

// GET all contact messages
router.get('/', contactController.getAllContacts);

// GET contact message by ID
router.get('/:id', contactController.getContactById);

// POST create contact message
router.post('/', contactController.createContact);

// PUT update contact message
router.put('/:id', contactController.updateContact);

// DELETE contact message
router.delete('/:id', contactController.deleteContact);

module.exports = router;