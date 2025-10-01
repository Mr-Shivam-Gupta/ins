// server.js
const express = require("express");
const cors = require("cors");
const cookieParser = require("cookie-parser");
const { connectDB, healthCheck } = require("./utils/database");
require("dotenv").config();

// Import route modules
const userRoutes = require("./routes/users");
const authRoutes = require("./routes/auth");
const teamRoutes = require("./routes/team");
const portfolioRoutes = require("./routes/portfolio");
const galleryRoutes = require("./routes/gallery");
const contactRoutes = require("./routes/contact");
const blogRoutes = require("./routes/blog");
const heroSliderRoutes = require("./routes/heroSlider");

const app = express();
const PORT = process.env.PORT || 5000;

// Middleware
app.use(cors({ origin: "*" }));

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cookieParser());

// Basic routes
app.get("/", (req, res) => {
  res.json({ message: " INS Portfolio API is running!" });
});

app.get("/health", async (req, res) => {
  try {
    const dbHealth = await healthCheck();
    res.json({ 
      status: "OK", 
      timestamp: new Date().toISOString(),
      database: dbHealth
    });
  } catch (error) {
    res.status(500).json({ 
      status: "ERROR", 
      timestamp: new Date().toISOString(),
      error: error.message
    });
  }
});

// API Routes
app.use("/api/users", userRoutes);
app.use("/api/auth", authRoutes);
app.use("/api/team", teamRoutes);
app.use("/api/portfolio", portfolioRoutes);
app.use("/api/gallery", galleryRoutes);
app.use("/api/contact", contactRoutes);
app.use("/api/blog", blogRoutes);
app.use("/api/hero-slider", heroSliderRoutes);

// Error handling middleware
app.use("*", (req, res) => {
  res.status(404).json({ error: "Route not found" });
});

app.use((err, req, res, next) => {
  console.error(err.stack);
  res.status(500).json({ error: "Something went wrong!" });
});

// Start server only after DB connection
connectDB().then(() => {
  app.listen(PORT, () => {
    console.log(" Server running on http://localhost:" + PORT);
    console.log(" API Documentation:");
    console.log("   Users: GET,POST,PUT,DELETE /api/users");
    console.log("   Team: GET,POST,PUT,DELETE /api/team");
    console.log("   Portfolio: GET,POST,PUT,DELETE /api/portfolio");
    console.log("   Gallery: GET,POST,PUT,DELETE /api/gallery");
    console.log("   Contact: GET,POST,PUT,DELETE /api/contact");
    console.log("   Blog: GET,POST,PUT,DELETE /api/blog");
    console.log("   Hero Slider: GET,POST,PUT,DELETE /api/hero-slider");
    console.log("   Blog Comments: POST /api/blog/:id/comments");
    console.log("   Blog Likes: POST /api/blog/:id/likes");
  });
}).catch((error) => {
  console.error("❌ Failed to start server:", error.message);
  process.exit(1);
});

module.exports = app;
