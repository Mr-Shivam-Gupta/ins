const express = require("express");
const router = express.Router();
const Service = require("../models/Service");

// Create Service
router.post("/", async (req, res) => {
  try {
    const service = new Service(req.body);
    await service.save();
    res.status(201).json(service);
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
});

// Get All Active Services
router.get("/", async (req, res) => {
  try {
    const services = await Service.find({ status: "Active" }).sort("order");
    res.json(services);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// Get Single Service by Slug
router.get("/:slug", async (req, res) => {
  try {
    const service = await Service.findOne({ slug: req.params.slug });
    if (!service) return res.status(404).json({ error: "Service not found" });
    res.json(service);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});
