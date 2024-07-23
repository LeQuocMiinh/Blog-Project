const express = require('express');
const router = express.Router();
const postsController = require('../app/controllers/PostsController');
const { authenticate, authorizeAdmin } = require('../app/middlewares/authorized');

router.get('/get-posts-by-filter', authenticate, postsController.getPostsByFilter);
router.post('/create', authenticate, authorizeAdmin, postsController.createPost);
router.use((req, res, next) => {
    res.status(404).send('Not Found');
});
module.exports = router;