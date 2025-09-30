// controllers/serviceController.js
const Service = require("../models/Service");

// Create Service
const createService = async (req, res) => {
  try {
    const service = new Service(req.body);
    await service.save();
    res.status(201).json(service);
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
};

// Get All Active Services
const getAllServices = async (req, res) => {
  try {
    const services = await Service.find({ status: "Active" }).sort("order");
    res.json(services);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

// Get Single Service by Slug
const getServiceBySlug = async (req, res) => {
  try {
    const service = await Service.findOne({ slug: req.params.slug });
    if (!service) return res.status(404).json({ error: "Service not found" });
    res.json(service);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

module.exports = {
  createService,
  getAllServices,
  getServiceBySlug,
};