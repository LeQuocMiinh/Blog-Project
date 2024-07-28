const category = require('../models/category');
const { generatePagination } = require('../../utils/generate-pagination');
const { uploadImageFromURL } = require('../../utils/upload-image-to-cloudinary');

class CategoryController {
    // [GET] - Get category detail
    async getCategoryDetail(req, res, next) {
        try {
            const id = req.params.id;
            const result = await category.findById(id);
            res.json({
                data: result,
                status: true
            });
        } catch (error) {
            next(error);
        }
    }

    // [GET] - Get all categories
    async getAllCategories(req, res, next) {
        try {
            const resultPagination = await generatePagination(category, req.query.page, req.query.perPage);
            res.json({
                ...resultPagination,
                status: true
            })
        } catch (error) {
            next(error);
        }
    }

    // [POST] - Create category
    async createCategory(req, res, next) {
        try {
            const { title, description, parent, image } = req.body;
            if (!title) {
                throw new APIError(400, 'Vui lòng điền đầy đủ!');
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
            next(error);
        }
    }

    //[PUT] - Update category
    async updateCategory(req, res, next) {
        try {
            const id = req.params.id;
            const params = req.body;
            const existCategory = await category.findById(id);
            if (!existCategory) {
                throw new APIError(400, 'Danh mục không tồn tại!');
            }

            if (params) {
                await category.findByIdAndUpdate(id, params);
            }

            res.json({
                message: "Cập nhật danh mục thành công",
                status: true
            });
        } catch (error) {
            next(error);
        }
    }

    // [PUT] - Move categories to trash
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
            next(error);
        }
    }

    // [PUT] - Move categories out the trash
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
            next(error);
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
            next(error);
        }
    }

}


module.exports = new CategoryController();