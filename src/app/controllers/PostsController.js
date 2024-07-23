
const Post = require('../models/post');

class PostsController {

    getPostsByFilter(req, res, next) {
        res.json('SinglePost Nè');
    }

    // [POST] - Create Post
    async createPost(req, res, next) {
        try {
            const { title, description, content, author, category, tag} = req.body;
            if (!title || !description || !content || !category || !tag) {
                return res.status(400).json({
                    message: "Các trường đều là bắt buộc !",
                    status: false
                });
            }

            const newPost = new Post({
                title: title,
                description: description,
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

}

module.exports = new PostsController();