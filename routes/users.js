const express = require("express");
const auth = require("../auth");
const router = express.Router();
const userController = require("../controllers/users");

// Check if username exists
router.post("/checkusername", userController.checkUsernameExists);

// Register a user
router.post("/", userController.registerUser);

// Login user
router.post("/login", userController.loginUser);

// Make user an admin
router.patch("/admin", auth.verify, userController.makeAdmin);

// View all users
router.get("/all", auth.verify, userController.viewAllUsers);

// View a user by ID and its posts
router.get("/:username", userController.viewUserByUsername);

module.exports = router;