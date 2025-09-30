// routes/portfolio.js
const express = require("express");
const router = express.Router();
const auth = require("../middleware/auth");
const portfolioController = require("../controllers/portfolioController");

// GET all portfolio items
router.get("/", portfolioController.getAllPortfolio);

// GET portfolio item by ID
router.get("/:id", portfolioController.getPortfolioById);

// POST create portfolio item (protected)
router.post("/", auth, portfolioController.createPortfolio);

// PUT update portfolio item (protected)
router.put("/:id", auth, portfolioController.updatePortfolio);

// DELETE portfolio item (protected)
router.delete("/:id", auth, portfolioController.deletePortfolio);

module.exports = router;
