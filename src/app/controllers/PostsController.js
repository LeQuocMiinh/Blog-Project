const { APIError } = require('../../utils/api-errors');
const post = require('../models/post');
const category = require('../models/category');
const tag = require('../models/tag');
class PostsController {
    // [GET] - Get post detail
    async getPostDetail(req, res, next) {
        try {
            const id = req.params.id;
            const result = await post.findById(id);
            res.json({
                data: result,
                status: true
            });
        } catch (error) {
            next(error);
        }
    }

    // [GET] - Get all posts - Search posts - Pagination
    async getPostsByFilter(req, res, next) {
        try {
            const page = parseInt(req.query.page) || 1,
                perPage = parseInt(req.query.perPage) || 10;
            const skip = (page - 1) * perPage;
            const data = await post.find({}).sort({ createdAt: -1 }).skip(skip).limit(perPage),
                countData = data.length,
                totalPost = await post.countDocuments(),
                totalPages = Math.ceil(totalPost / perPage),
                next = (totalPages - page) > 0 ? page + 1 : null,
                previous = page > 1 ? page - 1 : null;
            const dataAfterHandle = await Promise.all(data.map(async (item) => {
                if (item.category) {
                    const res = await category.findById(item.category);
                    item.category = res;
                }
                if (item.tag) {
                    const res = await tag.findById(item.tag);
                    item.tag = res;
                }
                return item;
            }));
            const response = {
                data: dataAfterHandle,
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

    // [POST] - Create post
    async createPost(req, res, next) {
        try {
            const { title, description, content, author, category, tag, image } = req.body;
            if (!title || !description || !content || !category || !tag) {
                throw new APIError(400, 'Vui lòng điền đầy đủ!');
            }

            const imagePath = req.file ? req.file.path : null;
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
                throw new APIError(400, 'Không tìm thấy bài viết!');
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