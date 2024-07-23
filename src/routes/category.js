const express = require('express');
const router = express.Router();
const { authenticate, authorizeAdmin } = require('../app/middlewares/authorized');
const categoryController = require('../app/controllers/CategoryController');

router.get('/get-all', authenticate, categoryController.getAllCategories);
router.post('/create', authenticate, authorizeAdmin, categoryController.createCategory);
router.delete('/trash/:id', authenticate, authorizeAdmin, categoryController.categoryToTrash);
router.post('/restore/:id', authenticate, authorizeAdmin, categoryController.categoryOutTrash);
router.delete('/delete/:id', authenticate, authorizeAdmin, categoryController.permanentlyDeleteCategory);
router.use((req, res, next) => {
    res.status(404).send('Not Found');
});
module.exports = router;