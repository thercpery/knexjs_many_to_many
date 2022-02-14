const express = require("express");
const router = express.Router();
const userController = require("../controllers/users");

// Check if username exists
router.post("/checkusername", userController.checkUsernameExists);

// Register a user
router.post("/", userController.registerUser);

// View a user by ID and its posts
router.get("/:username", userController.viewUserByUsername);

module.exports = router;