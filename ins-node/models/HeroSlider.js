// models/HeroSlider.js
const mongoose = require("mongoose");
const validator = require("validator");

const heroSliderSchema = new mongoose.Schema({
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
  title: {
    type: String,
    maxlength: [150, "Title must be less than 150 characters"],
  },
  subtitle: {
    type: String,
    maxlength: [250, "Subtitle must be less than 250 characters"],
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
  createdAt: {
    type: Date,
    default: Date.now,
  },
});

module.exports = mongoose.model("HeroSlider", heroSliderSchema);
