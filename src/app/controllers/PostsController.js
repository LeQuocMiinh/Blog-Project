const { APIError } = require('../../utils/api-errors');
const Post = require('../models/post');
const PostViews = require('../models/postViews');
const category = require('../models/category');
const tag = require('../models/tag');
class PostsController {
    // [GET] - Get Post detail
    async getPostDetail(req, res, next) {
        try {
            const id = req.params.id;
            const result = await Post.findById(id);
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
            const { deleted } = req.body;
            const page = parseInt(req.query.page) || 1,
                perPage = parseInt(req.query.perPage) || 10;
            const skip = (page - 1) * perPage;
            const data = await Post.find({}).sort({ createdAt: -1 }).skip(skip).limit(perPage),
                countData = data.length,
                totalPost = await Post.countDocuments(),
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

    // [Post] - Create Post
    async createPost(req, res, next) {
        try {
            const { title, description, content, author, category, tag, status, image } = req.body;
            if (!title || !content || !category || !tag) {
                throw new APIError(400, 'Vui lòng điền đầy đủ!');
            }

            const newPost = new Post({
                title: title,
                description: description,
                image: image,
                content: content,
                category: category,
                tag: tag,
                status: status,
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

    // [PUT] - Update Post
    async updatePost(req, res, next) {
        try {
            const id = req.params.id;
            const { title, description, content, author, category, tag, status, image } = req.body;
            const existsPost = await Post.findById(id);
            if (!existsPost || !id) {
                throw new APIError(400, 'Không tìm thấy bài viết!');
            }

            if (!title || !content || !category || !tag) {
                throw new APIError(400, 'Vui lòng điền đầy đủ!');
            }

            const newPost = {
                title: title,
                description: description,
                image: image,
                content: content,
                category: category,
                tag: tag,
                status: status,
            };

            await Post.findByIdAndUpdate({ _id: id }, { $set: newPost });

            res.json({
                message: "Cập nhật bài viết thành công",
                status: true,
            });
        } catch (error) {
            next(error);
        }
    }

    // [PUT] - Remove Post to trash
    async postToTrash(req, res, next) {
        try {
            const ids = req.params.id.split(",");
            await Post.updateMany(
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
            next(error);
        }
    }

    // [DELETE] - Permanently deleted Post
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
            next(error);
        }
    }

    // [GET] - Get Post Most Views - Options: Recent - Alls
    async getPostMostView(req, res, next) {
        try {
            const { nums, option } = req.body;
            let result = [];
            if (!option) {
                throw new (400, 'Thiếu trường dữ liệu [option]');
            }
            if (option === 'recent') {
                result = await Post.find({ deleted: false }).sort({ createdAt: -1 }).limit(nums ? nums : 10);
            }
            if (option === 'all') {
                result = await Post.find({ deleted: false }).sort({ views: -1 }).limit(nums ? nums : 10);
            }
            res.json({
                data: result,
                status: true
            });

        } catch (error) {
            next(error);
        }
    }


    // [POST] - Update Post Views
    async updatePostViews(req, res, next) {
        try {
            const id = req.params.id;
            const today = new Date();
            const localToday = new Date(today.toLocaleString("en-US", { timeZone: "Asia/Ho_Chi_Minh" }));
            localToday.setHours(0, 0, 0, 0);

            if (!id) {
                throw new APIError(400, 'Không tìm thấy ID bài hoặc không đúng!');
            }

            let postViews = await PostViews.findOne({ postId: id });

            if (!postViews) {
                postViews = new PostViews({
                    postId: id,
                    dailyViews: [{ date: today, views: 1 }]
                })

            } else {
                let todayView = postViews.dailyViews.find(view => {
                    const viewDate = new Date(view.date);
                    viewDate.setHours(0, 0, 0, 0);
                    return viewDate.getTime() === localToday.getTime();
                });

                if (todayView) {
                    todayView.views += 1;
                } else {
                    postViews.dailyViews.push({ date: today, views: 1 })
                }
            }

            await postViews.save();

            await Post.findByIdAndUpdate(
                { _id: id },
                { $inc: { views: 1 } }, // $inc để tăng giá trị của trường views
                { new: true } // Tùy chọn này trả về tài liệu đã được cập nhật
            )

            res.json({
                message: 'Thêm lượt xem thành công',
                now: today,
                data: postViews.dailyViews,
                status: true
            })

        } catch (error) {
            next(error)
        }
    }

    // [POST] - Get Post Views by Option 
    async getPostViews(req, res, next) {
        try {
            const { option, id } = req.body;
            const postViews = await PostViews.findOne({ postId: id });

            if (!id) {
                throw new APIError(400, 'Không tìm thấy bài viết!');
            }

            if (!postViews) {
                throw new APIError(400, 'Có lỗi xảy ra, vui lòng thử lại sau!');
            }

            const today = new Date().setTime(0, 0, 0, 0);
            const localToday = new Date(today.toLocaleString("en-US", { timeZone: "Asia/Ho_Chi_Minh" }));
            localToday.setHours(0, 0, 0, 0);
            let data;
            let viewFilterByOption = {
                "day": (postViews) => postViews.dailyViews.filter(view => new Date(view.date) >= localToday.getDate() - 7).sort((a, b) => b.date - a.date)
            };

            data = option ? viewFilterByOption[option](postViews) : postViews;

            res.json({
                data: data,
                status: true
            })

        } catch (error) {
            next(error);
        }
    }

    // [GET] - Reset Post Views
    async resetPostViews(req, res, next) {
        try {
            const ids = req.params.id.split(",");

            await Post.updateMany(
                { _id: { $in: ids } },
                { $set: { views: 0 } }
            );

            res.json({
                message: "Làm mới lượt xem thành công",
                status: true
            });

        } catch (error) {
            next(error);
        }
    }


}

module.exports = new PostsController();