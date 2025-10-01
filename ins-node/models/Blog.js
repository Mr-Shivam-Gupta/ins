// models/Blog.js
const mongoose = require("mongoose");
const validator = require("validator");

const commentSchema = new mongoose.Schema({
  name: { type: String }, // random visitor's name (optional)
  email: {
    type: String,
    validate: {
      validator: function (value) {
        return !value || validator.isEmail(value);
      },
      message: "Please provide a valid email address",
    },
  },
  text: { type: String, required: true },
  userAgent: { type: String }, // browser/device info
  ipAddress: { type: String },
  createdAt: { type: Date, default: Date.now },
});

const likeSchema = new mongoose.Schema({
  name: { type: String }, // optional (visitor may leave blank)
  email: {
    type: String,
    validate: {
      validator: function (value) {
        return !value || validator.isEmail(value);
      },
      message: "Please provide a valid email address",
    },
  },
  userAgent: { type: String },
  ipAddress: { type: String },
  createdAt: { type: Date, default: Date.now },
});

const blogSchema = new mongoose.Schema({
  title: {
    type: String,
    required: [true, "Blog title is required"],
    minlength: [5, "Title must be at least 5 characters long"],
  },
  content: {
    type: String,
    required: [true, "Blog content is required"],
    minlength: [20, "Content must be at least 20 characters long"],
  },
  author: { type: mongoose.Schema.Types.ObjectId, ref: "User", required: true },
  likes: [likeSchema],
  comments: [commentSchema],
  createdAt: { type: Date, default: Date.now },
});

module.exports = mongoose.model("Blog", blogSchema);
