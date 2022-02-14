const express = require("express");
const router = express.Router();
const categoryController = require("../controllers/categories");

// Get all categories
router.get("/", categoryController.viewAllCategories);

// Create a category
router.post("/", categoryController.createCategory);

// Attach category to post
router.post("/:id", categoryController.attachPostCategory);

// Get categories by title
router.get("/:title", categoryController.getCategoryByTitle);

module.exports = router;