const Team = require("../models/Team");

// GET all team members
const getAllTeam = async (req, res) => {
  try {
    const team = await Team.find().sort({ createdAt: -1 });
    res.json(team);
  } catch (err) {
    res.status(500).json({ error: "Failed to fetch team members" });
  }
};

// GET team member by ID
const getTeamById = async (req, res) => {
  try {
    const member = await Team.findById(req.params.id);
    if (!member) {
      return res.status(404).json({ error: "Team member not found" });
    }
    res.json(member);
  } catch (err) {
    res.status(500).json({ error: "Failed to fetch team member" });
  }
};

// POST create team member
const createTeam = async (req, res) => {
  try {
    // Ensure socialLinks is an array of objects if provided
    const { socialLinks, ...rest } = req.body;
    const member = new Team({
      ...rest,
      socialLinks: Array.isArray(socialLinks) ? socialLinks : [],
    });

    await member.save();
    res.status(201).json(member);
  } catch (err) {
    if (err.name === "ValidationError") {
      return res.status(400).json({ error: err.message });
    }
    res.status(500).json({ error: "Failed to create team member" });
  }
};

// PUT update team member
const updateTeam = async (req, res) => {
  try {
    const { socialLinks, ...rest } = req.body;

    const member = await Team.findByIdAndUpdate(
      req.params.id,
      {
        ...rest,
        ...(socialLinks && { socialLinks }), // update only if provided
      },
      { new: true, runValidators: true }
    );

    if (!member) {
      return res.status(404).json({ error: "Team member not found" });
    }
    res.json(member);
  } catch (err) {
    if (err.name === "ValidationError") {
      return res.status(400).json({ error: err.message });
    }
    res.status(500).json({ error: "Failed to update team member" });
  }
};

// DELETE team member
const deleteTeam = async (req, res) => {
  try {
    const member = await Team.findByIdAndDelete(req.params.id);
    if (!member) {
      return res.status(404).json({ error: "Team member not found" });
    }
    res.json({ message: "Team member deleted successfully" });
  } catch (err) {
    res.status(500).json({ error: "Failed to delete team member" });
  }
};

module.exports = {
  getAllTeam,
  getTeamById,
  createTeam,
  updateTeam,
  deleteTeam,
};
