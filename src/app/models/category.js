const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const { generateSlug } = require('../modules/auto-generate-slug');

const CategorySchema = new Schema({
    title: { type: String, maxLength: 255, required: true },
    description: { type: String, maxLength: 255 },
    quantity_post: { type: Number, default: 0 },
    type: {type: String, default: "category"},
    slug: { type: String },
    parent: { type: Schema.Types.ObjectId, ref: 'Category', default: null},
    deleted: {type: Boolean, default: false}
}, {
    timestamps: true
});

generateSlug(CategorySchema);

const Category = mongoose.model('Category', CategorySchema);
module.exports = Category;
