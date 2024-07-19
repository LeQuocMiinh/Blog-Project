const mongoose = require('mongoose');
const slug = require('mongoose-slug-generator');
const Schema = mongoose.Schema;

const CourseSchema = new Schema({
    name: { type: String, required: true },
    image: { type: String },
    desc: { type: String },
    videoId: { type: String },
    level: { type: String },
    slug: { type: String, slug: 'name' }
}, {
    timestamps: true
});


module.exports = mongoose.model('Course', CourseSchema);
