const category = require('../models/category');
const { generatePagination } = require('../../util/generate-pagination');
const { uploadImageFromURL } = require('../../util/upload-image-to-cloudinary');

class CategoryController {
    // [GET] - Get all categories
    async getAllCategories(req, res, next) {
        try {
            const resultPagination = await generatePagination(category, req.query.page, req.query.perPage);
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

    // [POST] - Create category
    async createCategory(req, res, next) {
        try {
            const { title, description, parent, image } = req.body;
            if (!title) {
                return res.status(400).json({
                    message: "Vui lòng nhập đầy đủ !",
                    status: false
                });
            }
            const imagePath = await uploadImageFromURL(image);

            const newCategory = new category({
                title: title,
                description: description,
                image: imagePath,
                parent: parent
            })

            await newCategory.save();

            res.json({
                message: "Thêm danh mục thành công",
                status: true
            });
        } catch (error) {
            res.status(500).json({
                message: "Đã xảy ra lỗi, vui lòng thử lại sau !",
                status: false
            });
        }
    }

    //[PUT] - 
    async updateCategory(req, res, next) {
        try {
            const id = req.params.id;
            const params = req.body;
            const existCategory = await category.findById(id);
            if (!existCategory) {
                res.json({
                    message: "Danh mục không tồn tại",
                    status: false
                });
            }

            if (params) {
                await category.findByIdAndUpdate(id, params);
            }

            res.json({
                message: "Cập nhật danh mục thành công",
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
            await category.updateMany(
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
            await category.updateMany(
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
            await category.deleteMany({ _id: { $in: ids } });
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