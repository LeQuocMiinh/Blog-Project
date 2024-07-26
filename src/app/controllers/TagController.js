const TagSchema = require('../models/tag');

class TagController {

    // [GET] - Get all tags
    async getAllTags(req, res, next) {
        try {
            const resultTags = await TagSchema.find({});
            res.json({
                data: resultTags,
                status: true
            })
        } catch (error) {
            res.status(500).json({
                message: "Đã xảy ra lỗi, vui lòng thử lại sau !",
                status: false
            });
        }
    }
    
    // [POST] - Create Tag
    async createTag(req, res, next) {
        try {
            const { title, description, type } = req.body;
            if (!title) {
                return res.status(400).json({
                    message: "Vui lòng nhập đầy đủ !",
                    status: false
                });
            }

            const newTag = new  TagSchema({
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

    // [DELETE] - Move categories to trash
    async tagsToTrash(req, res, next) {
        try {
            const ids = req.params.id.split(",");
            await TagSchema.updateMany(
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
    async tagsOutTrash(req, res, next) {
        try {
            const ids = req.params.id.split(",");
            await TagSchema.updateMany(
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

    // [DELETE] - Permanently deleted 
    async permanentlyDeleteTags(req, res, next) {
        try {
            const ids = req.params.id.split(",");
            await TagSchema.deleteMany({_id: {$in: ids}});
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