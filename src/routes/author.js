const express = require('express');
const router = express.Router();
const authorController = require('../app/controllers/AuthorController');
const { authenticate, authorizeAdmin } = require('../app/middlewares/authorized');

router.get('/fetch-user', authenticate, authorController.fetchUser);
router.get('/users-list', authenticate, authorizeAdmin, authorController.getUserList);
router.post('/normal-user', authorController.generateTokenForNormalUser);
router.post('/register', authorController.register);
router.post('/login', authorController.login);
router.post('/logout', authorController.logout);

module.exports = router;