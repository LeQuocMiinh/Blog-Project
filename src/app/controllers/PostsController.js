const { generatePagination } = require('../../util/generate-pagination');
const { uploadImageFromURL } = require('../../util/upload-image-to-cloudinary');
const Post = require('../models/post');

class PostsController {

    // [GET] - Get All Posts - Search Posts - Pagination
    async getPostsByFilter(req, res, next) {
        try {
            const resultPagination = await generatePagination(Post, req.query.page, req.query.perPage, req.query.keyword);
            res.json({
                ...resultPagination,
                status: true
            });
        } catch (error) {
            res.status(500).json({
                message: "Đã xảy ra lỗi, vui lòng thử lại sau !",
                status: false
            });
        }
    }

    // [POST] - Create Post
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
            const newPost = new Post({
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
            res.status(500).json({
                message: "Đã xảy ra lỗi, vui lòng thử lại sau !",
                status: false
            });
        }
    }

    // [PUT] - Update Post
    async updatePost(req, res, next) {
        try {
            const id = req.params.id;
            const post = await Post.findById(id);
            if (!post) {
                res.status(404).json({
                    message: "Đã xảy ra lỗi, vui lòng thử lại sau !",
                    status: false
                });
            }

            await Post.findByIdAndUpdate(id, req.body);
            res.json({
                message: "Cập nhật bài viết thành công",
                status: true,
            });
        } catch (error) {
            res.status(500).json({
                message: "Đã xảy ra lỗi, vui lòng thử lại sau !",
                status: false
            });
        }
    }

    // [PUT] - Remove Post to Trash
    async postToTrash(req, res, next) {
        try {
            const ids = req.params.id.split(",");
            await Post.updateMany(
                { _id: { $in: { ids } } },
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

    // [PUT] - Restore Post
    async postOutTrash(req, res, next) {
        try {
            const ids = req.params.id.split(",");
            await Post.updateMany(
                { _id: { $in: ids } },
                { $set: { deleted: false } }
            )

            res.json({
                message: "Khôi phục thành công",
                status: true
            });
        } catch (error) {
            res.status(500).json({
                message: "Đã xảy ra lỗi, vui lòng thử lại sau !",
                status: false
            });
        }
    }

    // [DELETE] - Permanently Deleted Post
    async permanentlyDeletedPost(req, res, next) {
        try {
            const ids = req.params.id.split(",");
            await Post.deleteMany(
                { _id: { $in: ids } },
            )

            res.json({
                message: "Xóa vĩnh viễn thành công",
                status: true
            });
        } catch (error) {
            res.status(500).json({
                message: "Đã xảy ra lỗi, vui lòng thử lại sau !",
                status: false
            });
        }
    }

    // [GET] - Get Recent Post
    async getRecentPost(req, res, next) {
        try {
            const nums = 10;
            const resultRecentPost = await Post.find({}).sort({ createdAt: -1 }).limit(nums);

            res.json({
                data: resultRecentPost,
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

module.exports = new PostsController();