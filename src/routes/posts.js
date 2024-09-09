const express = require('express');
const router = express.Router();
const postsController = require('../app/controllers/PostsController');
const { authenticate, authorizeAdmin } = require('../app/middlewares/authorized');
const { limitIpCallApiView } = require('../app/middlewares/get-ip');

router.get('/get-detail/:id', authenticate, postsController.getPostDetail);
router.get('/get-posts-by-filter', authenticate, postsController.getPostsByFilter);
router.get('/get-recent-posts', authenticate, postsController.getRecentPost);
router.post('/:id/view', authenticate, limitIpCallApiView, postsController.updateViews);
router.post('/create', authenticate, authorizeAdmin, postsController.createPost);
router.put('/update/:id', authenticate, authorizeAdmin, postsController.updatePost);
router.put('/trash/:id', authenticate, authorizeAdmin, postsController.postToTrash);
router.put('/restore/:id', authenticate, authorizeAdmin, postsController.postOutTrash);
router.delete('/delete/:id', authenticate, authorizeAdmin, postsController.permanentlyDeletedPost);

module.exports = router;