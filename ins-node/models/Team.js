// models/Team.js
const mongoose = require("mongoose");
const validator = require("validator");

// Sub-schema for social links
const teamSocialLinkSchema = new mongoose.Schema({
  name: {
    type: String,
    required: [true, "Social link name is required"],
    trim: true,
    maxlength: [50, "Name must be less than 50 characters"],
  },
  url: {
    type: String,
    required: [true, "URL is required"],
    validate: {
      validator: function (value) {
        return validator.isURL(value, {
          protocols: ["http", "https"],
          require_protocol: true,
        });
      },
      message: "Please provide a valid URL",
    },
  },
  icon: {
    type: String, // e.g. "fa-facebook", "mdi-twitter"
    trim: true,
  },
  color: {
    type: String, // e.g. "#4267B2" or "blue"
    trim: true,
  },
});

// Main Team schema
const teamSchema = new mongoose.Schema({
  name: {
    type: String,
    required: [true, "Team member name is required"],
    minlength: [2, "Name must be at least 2 characters long"],
    maxlength: [100, "Name must be less than 100 characters"],
  },
  designation: {
    type: String,
    required: [true, "Designation is required"],
    minlength: [2, "Designation must be at least 2 characters long"],
    maxlength: [100, "Designation must be less than 100 characters"],
  },
  image: {
    type: String,
    validate: {
      validator: function (value) {
        return (
          !value ||
          validator.isURL(value, {
            protocols: ["http", "https"],
            require_protocol: true,
          })
        );
      },
      message: "Please provide a valid image URL",
    },
  },
  socialLinks: [teamSocialLinkSchema], // Array of social links
  userAgent: { type: String }, // optional tracking
  ipAddress: { type: String }, // optional tracking
  createdAt: { type: Date, default: Date.now },
});

module.exports = mongoose.model("Team", teamSchema);
