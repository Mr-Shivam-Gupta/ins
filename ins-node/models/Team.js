// models/Team.js
const mongoose = require("mongoose");
const validator = require("validator");

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
  socialLinks: {
    facebook: {
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
        message: "Please provide a valid Facebook URL",
      },
    },
    twitter: {
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
        message: "Please provide a valid Twitter URL",
      },
    },
    linkedin: {
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
        message: "Please provide a valid LinkedIn URL",
      },
    },
    instagram: {
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
        message: "Please provide a valid Instagram URL",
      },
    },
  },
  userAgent: { type: String }, // optional tracking
  ipAddress: { type: String }, // optional tracking
  createdAt: { type: Date, default: Date.now },
});

module.exports = mongoose.model("Team", teamSchema);
