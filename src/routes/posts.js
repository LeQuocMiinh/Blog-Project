const express = require('express');
const router = express.Router();
const postsController = require('../app/controllers/PostsController');
const { authenticate, authorizeAdmin } = require('../app/middlewares/authorized');
const { limitIpCallApiView } = require('../app/middlewares/get-ip');

router.get('/get-detail/:id', authenticate, postsController.getPostDetail);
router.post('/get-views', authenticate, postsController.getPostViews);
router.post('/get-recent-posts', authenticate, postsController.getPostMostView);
router.post('/get-posts-by-filter', authenticate, postsController.getPostsByFilter);
router.post('/:id/view', authenticate, limitIpCallApiView, postsController.updatePostViews);
router.post('/create', authenticate, authorizeAdmin, postsController.createPost);
router.put('/update/:id', authenticate, authorizeAdmin, postsController.updatePost);
router.put('/trash/:id', authenticate, authorizeAdmin, postsController.postToTrash);
router.put('/restore/:id', authenticate, authorizeAdmin, postsController.postOutTrash);
router.delete('/delete/:id', authenticate, authorizeAdmin, postsController.permanentlyDeletedPost);

module.exports = router;