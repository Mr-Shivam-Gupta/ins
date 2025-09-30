const express = require("express");
const router = express.Router();
const serviceController = require("../controllers/serviceController");

// Create Service
router.post("/", serviceController.createService);

// Get All Active Services
router.get("/", serviceController.getAllServices);

// Get Single Service by Slug
router.get("/:slug", serviceController.getServiceBySlug);
