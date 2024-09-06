const postsRouter = require('./posts');
const authRouter = require('./author');
const categoryRouter = require('./category');
const tagRouter = require('./tag');
const mediaRouter = require('./media');

function route(app) {
    const apiPrefix = "/api/v1";

    app.use(`${apiPrefix}/auth`, authRouter); // Tài khoản
    app.use(`${apiPrefix}/posts`, postsRouter); // Bài viết
    app.use(`${apiPrefix}/tag`, tagRouter); // Thẻ bài viết
    app.use(`${apiPrefix}/category`, categoryRouter); // Danh mục bài viết
    app.use(`${apiPrefix}/media`, mediaRouter);
}

module.exports = route;