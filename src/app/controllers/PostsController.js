const CategoryScheme = require('../models/category');
class PostsController {

    getPostsByFilter(req, res, next) {
        res.json('SinglePost Nè');
    }

    createPost(req, res, next) {
        res.json("api chỉ dành cho admin");
    }

    // [POST] - Create Category
    async createCategory(req, res, next) {
        try {
            const { title, description } = req.body;
            if (!title) {
                return res.status(400).json({
                    message: "Vui lòng nhập đầy đủ !",
                    status: false
                });
            }

            const category = new CategoryScheme({
                title: title,
                description: description,
                type: "Danh mục"
            });

            await category.save();

            res.json({
                message: "Thêm danh mục bài viết thành công",
                status: true
            });

        } catch (error) {
            res.status(500).json({
                message: error,
                status: false
            });
        }

    }


}

module.exports = new PostsController();