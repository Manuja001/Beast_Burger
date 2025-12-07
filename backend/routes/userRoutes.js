const express = require("express");
const router = express.Router();
const {
  registerUser,
  loginUser,
  getAllUsers,
  getUserById,
  updateUser,
  deleteUser,
  getUserProfile,
} = require("../controllers/userController");

// Public routes
router.post("/register", registerUser);
router.post("/login", loginUser);

// Private routes
router.get("/profile/:id", getUserProfile);
router.get("/:id", getUserById);
router.put("/:id", updateUser);

// Admin routes
router.get("/", getAllUsers);
router.delete("/:id", deleteUser);

module.exports = router;

