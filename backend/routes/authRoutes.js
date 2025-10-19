const express = require("express");
const router = express.Router();

// Import controllers
const {
  register,
  login,
  getAllUsers,
  approveUser,
  rejectUser,
} = require("../controllers/authController");

// Import middleware
const { verifyToken, verifyAdmin } = require("../middleware/authMiddleware");

// -----------------------------
// Public Routes
// -----------------------------
router.post("/register", register);
router.post("/login", login);

// -----------------------------
// Protected Routes (Admin Only)
// -----------------------------
router.get("/users", verifyToken, verifyAdmin, getAllUsers);
router.put("/approve/:userId", verifyToken, verifyAdmin, approveUser);
router.delete("/reject/:userId", verifyToken, verifyAdmin, rejectUser);

module.exports = router;
