const express = require('express');
const router = express.Router();
const postsController = require('../app/controllers/PostsController');
const { authenticate, authorizeAdmin } = require('../app/middlewares/authorized');

router.get('/get-posts-by-filter', authenticate, postsController.getPostsByFilter);
router.get('/get-recent-posts', authenticate, postsController.getRecentPost);
router.post('/create', authenticate, authorizeAdmin, postsController.createPost);
router.put('/update/:id', authenticate, authorizeAdmin, postsController.updatePost);
router.put('/trash/:id', authenticate, authorizeAdmin, postsController.postToTrash);
router.put('/restore/:id', authenticate, authorizeAdmin, postsController.postOutTrash);
router.delete('/delete/:id', authenticate, authorizeAdmin, postsController.permanentlyDeletedPost);

module.exports = router;