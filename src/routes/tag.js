const express = require('express');
const router = express.Router();
const { authenticate, authorizeAdmin } = require('../app/middlewares/authorized');
const tagController = require('../app/controllers/TagController');

router.get('/get-all', authenticate, tagController.getAllTags);
router.post('/create', authenticate, authorizeAdmin, tagController.createTag);
router.delete('/trash/:id', authenticate, authorizeAdmin, tagController.tagsToTrash);
router.post('/restore/:id', authenticate, authorizeAdmin, tagController.tagsOutTrash);
router.delete('/delete/:id', authenticate, authorizeAdmin, tagController.permanentlyDeleteTags);
router.use((req, res, next) => {
    res.status(404).send('API Not Found');
});
module.exports = router;