const { generatePagination } = require('../../utils/generate-pagination');
const { uploadImageFromURL } = require('../../utils/upload-image-to-cloudinary');
const post = require('../models/post');

class PostsController {
    // [GET] - Get all posts - Search posts - Pagination
    async getPostsByFilter(req, res, next) {
        try {
            const resultPagination = await generatePagination(post, req.query.page, req.query.perPage, req.query.keyword);
            res.json({
                ...resultPagination,
                status: true
            });
        } catch (error) {
            next(error);
        }
    }

    // [POST] - Create post
    async createPost(req, res, next) {
        try {
            const { title, description, content, author, category, tag, image } = req.body;
            if (!title || !description || !content || !category || !tag) {
                return res.status(400).json({
                    message: "Các trường đều là bắt buộc !",
                    status: false
                });
            }
            const imagePath = await uploadImageFromURL(image);
            const newPost = new post({
                title: title,
                description: description,
                image: imagePath,
                content: content,
                category: [category],
                tag: [tag],
                author: author
            });

            await newPost.save();

            res.json({
                message: "Thêm bài viết thành công",
                status: true,
            });
        } catch (error) {
            next(error);
        }
    }

    // [PUT] - Update post
    async updatePost(req, res, next) {
        try {
            const id = req.params.id;
            const post = await post.findById(id);
            if (!post) {
                res.status(404).json({
                    message: "Đã xảy ra lỗi, vui lòng thử lại sau !",
                    status: false
                });
            }

            await post.findByIdAndUpdate(id, req.body);
            res.json({
                message: "Cập nhật bài viết thành công",
                status: true,
            });
        } catch (error) {
            next(error);
        }
    }

    // [PUT] - Remove post to trash
    async postToTrash(req, res, next) {
        try {
            const ids = req.params.id.split(",");
            await post.updateMany(
                { _id: { $in: { ids } } },
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

    // [PUT] - Restore post
    async postOutTrash(req, res, next) {
        try {
            const ids = req.params.id.split(",");
            await post.updateMany(
                { _id: { $in: ids } },
                { $set: { deleted: false } }
            )

            res.json({
                message: "Khôi phục thành công",
                status: true
            });
        } catch (error) {
            next(error);
        }
    }

    // [DELETE] - Permanently deleted post
    async permanentlyDeletedPost(req, res, next) {
        try {
            const ids = req.params.id.split(",");
            await post.deleteMany(
                { _id: { $in: ids } },
            )

            res.json({
                message: "Xóa vĩnh viễn thành công",
                status: true
            });
        } catch (error) {
            next(error);
        }
    }

    // [GET] - Get recent post
    async getRecentPost(req, res, next) {
        try {
            const nums = 10;
            const resultRecentPost = await post.find({}).sort({ createdAt: -1 }).limit(nums);

            res.json({
                data: resultRecentPost,
                status: true
            });

        } catch (error) {
            next(error);
        }
    }


}

module.exports = new PostsController();