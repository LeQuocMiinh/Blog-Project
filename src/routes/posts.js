const express = require('express');
const router = express.Router();
const postsController = require('../app/controllers/PostsController');
const { authenticate, authorizeAdmin } = require('../app/middlewares/authorized');

router.get('/get-posts-by-filter',authenticate, postsController.getPostsByFilter);
router.post('/create-post', authenticate, authorizeAdmin, postsController.createPost);
router.post('/create-category', authenticate, authorizeAdmin, postsController.createCategory);

module.exports = router;