const mongoose = require("mongoose");

const serviceSchema = new mongoose.Schema(
  {
    title: {
      type: String,
      required: true,
      trim: true,
    },
    slug: {
      type: String,
      required: true,
      unique: true, // e.g. /web-development
      lowercase: true,
    },
    description: {
      type: String,
      trim: true,
    },
    image: {
      type: String, // store image URL or path
    },
    icon: {
      type: String, // optional icon class
    },

    // SEO / Meta Fields
    pageTitle: {
      type: String,
      trim: true,
    },
    metaDescription: {
      type: String,
      trim: true,
    },
    metaKeywords: [
      {
        type: String,
        trim: true,
      },
    ],
    canonicalUrl: {
      type: String,
      trim: true,
    },
    ogImage: {
      type: String, // for social sharing (Open Graph)
    },
    ogTitle: {
      type: String,
      trim: true,
    },
    ogDescription: {
      type: String,
      trim: true,
    },

    // Section Controls
    category: {
      type: String, // e.g., "Web Development", "Marketing"
    },
    layoutType: {
      type: String,
      enum: ["grid", "slider", "tabs"], // for frontend rendering
      default: "grid",
    },
    order: {
      type: Number,
      default: 0,
    },
    status: {
      type: String,
      enum: ["Active", "Inactive"],
      default: "Active",
    },
  },
  { timestamps: true }
);

module.exports = mongoose.model("Service", serviceSchema);
