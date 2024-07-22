const CategoryScheme = require('../models/category');
const TagScheme = require('../models/tag');

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
            const { title, description, type } = req.body;
            if (!title) {
                return res.status(400).json({
                    message: "Vui lòng nhập đầy đủ !",
                    status: false
                });
            }

            const newCategory =  new ((type == "category") ? CategoryScheme : TagScheme)({
                title: title,
                description: description,
                type: type 
            }) 

            await newCategory.save();
            res.json({
                message: (type == "category") ? "Thêm danh mục bài viết thành công" : "Thêm thẻ bài viết thành công",
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