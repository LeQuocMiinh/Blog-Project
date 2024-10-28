const express = require('express');
const router = express.Router();
const authorController = require('../app/controllers/AuthorController');
const { authenticate } = require('../app/middlewares/authorized');

router.get('/fetch-user', authenticate, authorController.fetchUser);
router.post('/normal-user', authorController.generateTokenForNormalUser);
router.post('/register', authorController.register);
router.post('/login', authorController.login);
router.post('/logout', authorController.logout);

module.exports = router;