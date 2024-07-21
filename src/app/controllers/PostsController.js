class PostsController {
     
    getPostsByFilter(req, res, next) {
        res.json('SinglePost Nè');
    }

    createPost(req, res, next) {
        res.json("api chỉ dành cho admin");
    }

}

module.exports = new PostsController;