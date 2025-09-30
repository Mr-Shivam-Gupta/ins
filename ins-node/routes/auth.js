// routes/auth.js
const express = require("express");
const router = express.Router();
const auth = require("../middleware/auth");
const authController = require("../controllers/authController");

// LOGIN
router.post("/login", authController.login);

// LOGOUT
router.post("/logout", authController.logout);

// CHANGE PASSWORD
router.post("/change-password", auth, authController.changePassword);

module.exports = router;
