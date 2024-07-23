const CategorySchema = require('../models/category');
const { generatePagination } = require('../modules/generate-pagination');

class CategoryController {

    // [GET] - Get all categories
    async getAllCategories(req, res, next) {
        try {
            const resultPagination = await generatePagination(CategorySchema, req.query.page, req.query.perPage);
            res.json({
                ...resultPagination,
                status: true
            })
        } catch (error) {
            res.status(500).json({
                message: "Đã xảy ra lỗi, vui lòng thử lại sau !",
                status: false
            });
        }
    }
    
    // [POST] - Create Category
    async createCategory(req, res, next) {
        try {
            const { title, description, parent} = req.body;
            if (!title) {
                return res.status(400).json({
                    message: "Vui lòng nhập đầy đủ !",
                    status: false
                });
            }

            const newCategory = new CategorySchema ({
                title: title,
                description: description,
                type: "category",
                parent: parent
            })

            await newCategory.save();
            res.json({
                message: "Thêm danh mục bài viết thành công",
                status: true
            });
        } catch (error) {
            res.status(500).json({
                message: "Đã xảy ra lỗi, vui lòng thử lại sau !",
                status: false
            });
        }
    }

    // [DELETE] - Move categories to trash
    async categoryToTrash(req, res, next) {
        try {
            const ids = req.params.id.split(",");
            await CategorySchema.updateMany(
                { _id: { $in: ids } },
                { $set: { deleted: true } }
            );
            res.json({
                message: "Chuyển vào thùng rác thành công",
                status: true
            });
        } catch (error) {
            res.status(500).json({
                message: "Đã xảy ra lỗi, vui lòng thử lại sau !",
                status: false
            });
        }
    }

    // [POST] - Move categories out the trash
    async categoryOutTrash(req, res, next) {
        try {
            const ids = req.params.id.split(",");
            await CategorySchema.updateMany(
                { _id: { $in: ids } },
                { $set: { deleted: false } }
            );
            res.json({
                message: "Khôi phục danh mục thành công",
                status: true
            });
        } catch (error) {
            res.status(500).json({
                message: "Đã xảy ra lỗi, vui lòng thử lại sau !",
                status: false
            });
        }
    }

    // [DELETE] - Permanently deleted 
    async permanentlyDeleteCategory(req, res, next) {
        try {
            const ids = req.params.id.split(",");
            await CategorySchema.deleteMany({_id: {$in: ids}});
            res.json({
                message: "Xóa vĩnh viễn danh mục thành công",
                status: true
            });
        } catch (error) {
            res.status(500).json({
                message: "Đã xảy ra lỗi, vui lòng thử lại sau !",
                status: false
            });
        }
    }
}


module.exports = new CategoryController();