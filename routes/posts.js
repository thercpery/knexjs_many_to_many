const express = require("express");
const auth = require("../auth")
const router = express.Router();
const postController = require("../controllers/posts");

// Get all posts.
router.get("/", postController.viewAllPosts);

// Create a post
router.post("/", auth.verify, postController.createAPost)

// Get post by id
router.get("/:id", postController.getPostCategoriesById);

module.exports = router;