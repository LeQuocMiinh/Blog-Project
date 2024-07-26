const express = require('express');
const router = express.Router();
const authorController = require('../app/controllers/AuthorController');
const { authenticate } = require('../app/middlewares/authorized');

router.get('/fetch-user', authenticate, authorController.fetchUser);
router.post('/register', authorController.register);
router.post('/login', authorController.login);
router.use((req, res, next) => {
    res.status(404).send('API Not Found');
});
module.exports = router;
