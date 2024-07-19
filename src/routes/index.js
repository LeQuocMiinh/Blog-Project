const siteRouter = require('./site');
const coursesRouter = require('../routes/courses');

function route(app) {

    app.use('/courses', coursesRouter);
    app.use('/', siteRouter);
}

module.exports = route;