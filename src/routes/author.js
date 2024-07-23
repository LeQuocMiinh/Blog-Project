const express = require('express');
const router = express.Router();
const authorController = require('../app/controllers/AuthorController');

router.post('/register', authorController.register);
router.post('/login', authorController.login);
router.use((req, res, next) => {
    res.status(404).send('Not Found');
});
module.exports = router;
