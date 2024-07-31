const express = require('express');
const router = express.Router();
const { authenticate, authorizeAdmin } = require('../app/middlewares/authorized');
const tagController = require('../app/controllers/TagController');

router.get('/get-all', authenticate, tagController.getAllTags);
router.get('/get-detail/:id', authenticate, tagController.getTagDetail);
router.post('/create', authenticate, authorizeAdmin, tagController.createTag);
router.put('/update/:id', authenticate, authorizeAdmin, tagController.updateTag);
router.put('/trash/:id', authenticate, authorizeAdmin, tagController.tagsToTrash);
router.put('/restore/:id', authenticate, authorizeAdmin, tagController.tagsOutTrash);
router.delete('/delete/:id', authenticate, authorizeAdmin, tagController.permanentlyDeleteTags);

module.exports = router;