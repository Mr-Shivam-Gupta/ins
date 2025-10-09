// routes/auth.js
const express = require("express");
const router = express.Router();
const auth = require("../middleware/auth");
const {
  login,
  logout,
  changePassword,
} = require("../controllers/authController");
const { createUser } = require("../controllers/userController");

// LOGIN
router.post("/login", login);
router.post("/signup", createUser);

// LOGOUT
router.post("/logout", auth, logout);

// CHANGE PASSWORD
router.post("/change-password", auth, changePassword);

module.exports = router;
