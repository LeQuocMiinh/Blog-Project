const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const { generateSlug } = require('../modules/auto-generate-slug');

const TagSchema = new Schema({
    title: { type: String, maxLength: 255, required: true },
    description: { type: String, maxLength: 255 },
    quantity_post: { type: Number, default: 0 },
    type: {type: String, default: "tag", required: true},
    slug: { type: String}
}, {
    timestamps: true
});


generateSlug(TagSchema);

const Tag = mongoose.model('Tag', TagSchema);
module.exports = Tag;
