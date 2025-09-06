// models/Portfolio.js
const mongoose = require("mongoose");
const validator = require("validator");

const portfolioSchema = new mongoose.Schema({
  title: {
    type: String,
    required: [true, "Portfolio title is required"],
    minlength: [3, "Title must be at least 3 characters long"],
    maxlength: [150, "Title must be less than 150 characters"],
  },
  shortDesc: {
    type: String,
    maxlength: [300, "Short description must be less than 300 characters"],
    default: null, // ✅ nullable
  },
  description: {
    type: String,
    maxlength: [1000, "Description must be less than 1000 characters"],
  },
  image: {
    type: String,
    required: [true, "Image URL is required"],
    validate: {
      validator: function (value) {
        return validator.isURL(value, {
          protocols: ["http", "https"],
          require_protocol: true,
        });
      },
      message: "Please provide a valid image URL",
    },
  },
  category: {
    type: String,
    maxlength: [100, "Category must be less than 100 characters"],
  },
  link: {
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
      message: "Please provide a valid link URL",
    },
  },
  userAgent: { type: String }, // optional tracking
  ipAddress: { type: String }, // optional tracking
  createdAt: { type: Date, default: Date.now },
});

module.exports = mongoose.model("Portfolio", portfolioSchema);
