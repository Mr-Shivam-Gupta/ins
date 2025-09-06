// models/Gallery.js
const mongoose = require("mongoose");
const validator = require("validator");

const gallerySchema = new mongoose.Schema({
  category: {
    type: String,
    required: [true, "Category is required"],
    minlength: [2, "Category must be at least 2 characters long"],
    maxlength: [100, "Category must be less than 100 characters"],
  },
  description: {
    type: String,
    maxlength: [300, "Description must be less than 300 characters"],
  },
  images: [
    {
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
  ],
  userAgent: { type: String }, // who uploaded (optional)
  ipAddress: { type: String }, // uploader's IP (optional)
  createdAt: { type: Date, default: Date.now },
});

module.exports = mongoose.model("Gallery", gallerySchema);
