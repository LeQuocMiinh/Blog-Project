const postsRouter = require('./posts');
const authRouter = require('./author');
const categoryRouter =  require('./category');
const tagRouter =  require('./tag');

function route(app) {
    const apiPrefix = "/api/v4";

    app.use(`${apiPrefix}/auth`, authRouter); // Tài khoản
    app.use(`${apiPrefix}/posts`, postsRouter); // Bài viết
    app.use(`${apiPrefix}/tag`, tagRouter); // Thẻ bài viết
    app.use(`${apiPrefix}/category`, categoryRouter); // Danh mục bài viết
}

module.exports = route;