const express = require('express');
const router = express.Router();
const postsController = require('../app/controllers/PostsController');
const categoryController = require('../app/controllers/CategoryController');
const { authenticate, authorizeAdmin } = require('../app/middlewares/authorized');

router.get('/get-posts-by-filter', authenticate, postsController.getPostsByFilter);
router.get('/get-all-categories', authenticate, categoryController.getAllCategory);
router.post('/create-post', authenticate, authorizeAdmin, postsController.createPost);
router.post('/create-category', authenticate, authorizeAdmin, categoryController.createCategory);
router.post('/create-tag', authenticate, authorizeAdmin, categoryController.createCategory);

module.exports = router;