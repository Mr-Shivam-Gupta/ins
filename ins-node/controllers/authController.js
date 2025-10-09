// controllers/authController.js
const jwt = require("jsonwebtoken");
const bcrypt = require("bcryptjs");
const User = require("../models/User");
const logger = require("../utils/logger");

// LOGIN
const login = async (req, res) => {
  const { email, password } = req.body;
  if (!email || !password) {
    logger.warn(`Login attempt failed - missing email or password`);
    return res.status(400).json({ error: "Email and password are required" });
  }
  try {
    const user = await User.findOne({ email });
    if (!user) {
      logger.warn(`Login failed - user not found (email: ${email})`);
      return res.status(401).json({ error: "Invalid credentials" });
    }
    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) {
      logger.warn(`Login failed - wrong password (email: ${email})`);
      return res.status(401).json({ error: "Invalid credentials" });
    }

    // Success login
    const token = jwt.sign(
      { id: user._id, email: user.email, role: user.role },
      process.env.JWT_SECRET || "secretkey",
      { expiresIn: "1d" }
    );
    res.cookie("token", token, {
      secure: process.env.NODE_ENV === "production",
      sameSite: "strict",
      maxAge: 24 * 60 * 60 * 1000,
    });

    logger.info(`User logged in: ${user.email} (id: ${user._id})`);

    const userResponse = user.toObject();
    delete userResponse.password;
    res.json({ user: userResponse, token });
  } catch (err) {
    logger.error(`Login error: ${err.message}`);
    res.status(500).json({ error: "Login failed" });
  }
};

// LOGOUT
const logout = (req, res) => {
  logger.info(`User logged out: ${req.user?.email || "Unknown user"}`);
  res.clearCookie("token");
  res.json({ message: "Logged out successfully" });
};

// CHANGE PASSWORD
const changePassword = async (req, res) => {
  const { oldPassword, newPassword } = req.body;
  if (!oldPassword || !newPassword) {
    logger.warn(
      `Password change attempt failed - missing fields (user: ${
        req.user?.email || "Unknown"
      })`
    );
    return res.status(400).json({ error: "Old and new password are required" });
  }
  try {
    const user = await User.findById(req.user.id);
    if (!user) {
      logger.warn(
        `Password change failed - user not found (id: ${req.user.id})`
      );
      return res.status(404).json({ error: "User not found" });
    }

    const isMatch = await bcrypt.compare(oldPassword, user.password);
    if (!isMatch) {
      logger.warn(
        `Password change failed - wrong old password (email: ${user.email})`
      );
      return res.status(401).json({ error: "Old password is incorrect" });
    }

    user.password = await bcrypt.hash(newPassword, 10);
    await user.save();

    logger.info(`Password changed successfully for user: ${user.email}`);
    res.json({ message: "Password changed successfully" });
  } catch (err) {
    logger.error(
      `Password change error for user ${req.user?.email || "Unknown"}: ${
        err.message
      }`
    );
    res.status(500).json({ error: "Failed to change password" });
  }
};

module.exports = {
  login,
  logout,
  changePassword,
};
