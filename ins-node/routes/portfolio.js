// routes/portfolio.js
const express = require("express");
const router = express.Router();
const Portfolio = require("../models/Portfolio");
const auth = require("../middleware/auth");

// GET all portfolio items
router.get("/", async (req, res) => {
  try {
    const { category } = req.query;
    const filter = category ? { category } : {};
    const portfolio = await Portfolio.find(filter).sort({ createdAt: -1 });
    res.json(portfolio);
  } catch (err) {
    res.status(500).json({ error: "Failed to fetch portfolio items" });
  }
});

// GET portfolio item by ID
router.get("/:id", async (req, res) => {
  try {
    const item = await Portfolio.findById(req.params.id);
    if (!item) {
      return res.status(404).json({ error: "Portfolio item not found" });
    }
    res.json(item);
  } catch (err) {
    res.status(500).json({ error: "Failed to fetch portfolio item" });
  }
});

// POST create portfolio item (protected)
router.post("/", auth, async (req, res) => {
  try {
    const item = new Portfolio(req.body);
    await item.save();
    res.status(201).json(item);
  } catch (err) {
    if (err.name === "ValidationError") {
      return res.status(400).json({ error: err.message });
    }
    res.status(500).json({ error: "Failed to create portfolio item" });
  }
});

// PUT update portfolio item (protected)
router.put("/:id", auth, async (req, res) => {
  try {
    const item = await Portfolio.findByIdAndUpdate(
      req.params.id,
      req.body,
      { new: true, runValidators: true }
    );
    if (!item) {
      return res.status(404).json({ error: "Portfolio item not found" });
    }
    res.json(item);
  } catch (err) {
    if (err.name === "ValidationError") {
      return res.status(400).json({ error: err.message });
    }
    res.status(500).json({ error: "Failed to update portfolio item" });
  }
});

// DELETE portfolio item (protected)
router.delete("/:id", auth, async (req, res) => {
  try {
    const item = await Portfolio.findByIdAndDelete(req.params.id);
    if (!item) {
      return res.status(404).json({ error: "Portfolio item not found" });
    }
    res.json({ message: "Portfolio item deleted successfully" });
  } catch (err) {
    res.status(500).json({ error: "Failed to delete portfolio item" });
  }
});

module.exports = router;
