const { generatePagination } = require('../../util/generate-pagination');
const tag = require('../models/tag');
class TagController {
    // [GET] - Get all tags
    async getAllTags(req, res, next) {
        try {
            const resultTags = await generatePagination(tag, req.query.page, req.query.perPage);
            res.json({
                ...resultTags,
                status: true
            })
        } catch (error) {
            res.status(500).json({
                message: "Đã xảy ra lỗi, vui lòng thử lại sau !",
                status: false
            });
        }
    }

    // [POST] - Create tag
    async createTag(req, res, next) {
        try {
            const { title, description } = req.body;
            if (!title) {
                return res.status(400).json({
                    message: "Vui lòng nhập đầy đủ !",
                    status: false
                });
            }

            const newTag = new tag({
                title: title,
                description: description,
            })

            await newTag.save();
            res.json({
                message: "Thêm thẻ bài viết thành công",
                status: true
            });
        } catch (error) {
            res.status(500).json({
                message: "Đã xảy ra lỗi, vui lòng thử lại sau !",
                status: false
            });
        }
    }

    // [PUT] - Update tag
    async updateTag(req, res, next) {
        try {
            const id = req.params.id;
            const params = req.body;
            const existTag = await tag.findById(id);
            if (!existTag) {
                res.json({
                    message: "Thẻ không tồn tại",
                    status: false
                });
            }

            if (params) {
                await tag.findByIdAndUpdate(id, params);
            }

            res.json({
                message: "Cập nhật thẻ thành công",
                status: true
            });
        } catch (error) {
            res.status(500).json({
                message: "Đã xảy ra lỗi, vui lòng thử lại sau !",
                status: false
            });
        }
    }

    // [PUT] - Move categories to trash
    async tagsToTrash(req, res, next) {
        try {
            const ids = req.params.id.split(",");
            await tag.updateMany(
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

    // [PUT] - Move categories out the trash
    async tagsOutTrash(req, res, next) {
        try {
            const ids = req.params.id.split(",");
            await tag.updateMany(
                { _id: { $in: ids } },
                { $set: { deleted: false } }
            );

            res.json({
                message: "Khôi phục thẻ thành công",
                status: true
            });
        } catch (error) {
            res.status(500).json({
                message: "Đã xảy ra lỗi, vui lòng thử lại sau !",
                status: false
            });
        }
    }

    // [DELETE] - Permanently deleted tag
    async permanentlyDeleteTags(req, res, next) {
        try {
            const ids = req.params.id.split(",");
            await tag.deleteMany({ _id: { $in: ids } });

            res.json({
                message: "Xóa vĩnh viễn thẻ thành công",
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


module.exports = new TagController();