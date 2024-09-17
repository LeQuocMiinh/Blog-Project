const { APIError } = require('../../utils/api-errors');
const category = require('../models/category');

class CategoryController {
    // [GET] - Get category detail
    async getCategoryDetail(req, res, next) {
        try {
            const id = req.params.id;
            const result = await category.findById(id);
            if (!id || !result) {
                throw new APIError(400, 'Không tồn tại danh mục!')
            }

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
            const { deleted } = req.body;
            const page = parseInt(req.query.page) || 1,
                perPage = parseInt(req.query.perPage) || 10;
            const skip = (page - 1) * perPage;
            const data = await category.find({}).sort({ createdAt: -1 }).skip(skip).limit(perPage),
                countData = data.length,
                totalPost = await category.countDocuments(),
                totalPages = Math.ceil(totalPost / perPage),
                next = (totalPages - page) > 0 ? page + 1 : null,
                previous = page > 1 ? page - 1 : null;
            const dataAfterHandle = await Promise.all(data.map(async (item) => {
                if (item.parent) {
                    const res = await category.findById(item.parent);
                    item.parent = res;
                }
                if (deleted) {
                    return !item.deleted ? item : null;
                } else {
                    return item;
                }
            }));

            const response = {
                data: dataAfterHandle.filter(e => e != null),
                countData: countData,
                perPage: perPage,
                current: page,
                next: next,
                prev: previous,
                totalPages: totalPages,
                totalPost: totalPost
            };

            res.json({
                ...response,
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

            const newCategory = new category({
                title: title,
                description: description,
                image: image,
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
            const existCate = await category.findById(id);
            if (!id || !existCate) {
                throw new APIError(400, 'Danh mục không tồn tại!');
            }
            let { title, description, parent, image } = req.body;

            parent = (parent === id) ? null : parent;

            const newCategory = {
                title: title,
                description: description,
                parent: parent,
                image: image,
            };

            await category.findByIdAndUpdate({ _id: id }, { $set: newCategory });

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