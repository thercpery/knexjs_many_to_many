const express = require("express");
const router = express.Router();
const postController = require("../controllers/posts");

// Get all posts.
router.get("/", postController.viewAllPosts);

// Get post by id
router.get("/:id", postController.getPostCategoriesById);

module.exports = router;