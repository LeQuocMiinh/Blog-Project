const siteRouter = require('./site');
const postsRouter = require('./posts');
const authRouter = require('./author');

function route(app) {

    app.use('/auth', authRouter);
    app.use('/posts', postsRouter);
    app.use('/', siteRouter);
    
}

module.exports = route;