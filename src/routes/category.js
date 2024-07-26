const express = require('express');
const router = express.Router();
const { authenticate, authorizeAdmin } = require('../app/middlewares/authorized');
const categoryController = require('../app/controllers/CategoryController');

router.get('/get-all', authenticate, categoryController.getAllCategories);
router.post('/create', authenticate, authorizeAdmin, categoryController.createCategory);
router.put('/update/:id', authenticate, authorizeAdmin, categoryController.updateCategory);
router.put('/trash/:id', authenticate, authorizeAdmin, categoryController.categoryToTrash);
router.put('/restore/:id', authenticate, authorizeAdmin, categoryController.categoryOutTrash);
router.delete('/delete/:id', authenticate, authorizeAdmin, categoryController.permanentlyDeleteCategory);
router.use((req, res, next) => {
    res.status(404).send('API Not Found');
});
module.exports = router;