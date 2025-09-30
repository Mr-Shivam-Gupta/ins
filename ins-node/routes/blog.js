// routes/blog.js
const express = require('express');
const router = express.Router();
const blogController = require('../controllers/blogController');

// GET all blog posts
router.get('/', blogController.getAllBlogs);

// GET blog post by ID
router.get('/:id', blogController.getBlogById);

// POST create blog post
router.post('/', blogController.createBlog);

// PUT update blog post
router.put('/:id', blogController.updateBlog);

// DELETE blog post
router.delete('/:id', blogController.deleteBlog);

// POST add comment to blog
router.post('/:id/comments', blogController.addComment);

// POST add like to blog
router.post('/:id/likes', blogController.addLike);

module.exports = router;