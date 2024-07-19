const Course = require('../models/Courses');
const { multipleMongooseToObject, mongooseToObject } = require('../../util/mongoose');

class CourseController {
    //[GET] /courses/:slug
    detail_courses(req, res, next) {
        Course.findOne({ slug: req.params.slug }).then(course => {
            res.render('courses/details', { course: mongooseToObject(course) });
        }).catch(next);
    }

    //[GET] /courses
    list_courses(req, res, next) {
        Course.find({}).then((courses) => {
            const course = multipleMongooseToObject(courses);
            res.json(course);
        }).catch(next);
    }

    //[GET] /courses/create
    create_courses(req, res, next) {
        res.render('courses/create');
    }

    //[POST] /courses/store
    store_courses(req, res, next) {
        const formData = req.body;
        formData.image = `https://img.youtube.com/vi/${req.body.videoId}/sddefault.jpg`;
        const courses = new Course(formData);
        courses.save().then(() => {
            res.redirect('/courses');
        }).catch(next);
    }

    //[POST] /courses/update
    update_courses(req, res, next) {

    }

}

module.exports = new CourseController;
