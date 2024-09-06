const express = require('express');
const MediaController = require('../app/controllers/MediaController');
const { authenticate, authorizeAdmin } = require('../app/middlewares/authorized');
const router = express.Router();

router.get('/get-all', authenticate, authorizeAdmin, MediaController.getAllMedia);
router.post('/upload', authenticate, authorizeAdmin, MediaController.upload.array('images'), MediaController.uploadMedia);
router.delete('/delete/:id', authenticate, authorizeAdmin, MediaController.deleteMedia);

module.exports = router