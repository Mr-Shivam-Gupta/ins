// routes/team.js
const express = require("express");
const router = express.Router();
const teamController = require("../controllers/teamController");

// GET all team members
router.get("/", teamController.getAllTeam);

// GET team member by ID
router.get("/:id", teamController.getTeamById);

// POST create team member
router.post("/", teamController.createTeam);

// PUT update team member
router.put("/:id", teamController.updateTeam);

// DELETE team member
router.delete("/:id", teamController.deleteTeam);

module.exports = router;
