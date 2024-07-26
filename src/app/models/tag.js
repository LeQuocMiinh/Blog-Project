const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const { generateSlug } = require('../../util/auto-generate-slug');

const TagSchema = new Schema({
    title: { type: String, maxLength: 255, required: true },
    description: { type: String, maxLength: 255 },
    slug: { type: String },
    deleted: { type: Boolean, default: false }
}, {
    timestamps: true
});


generateSlug(TagSchema);

const Tag = mongoose.model('Tag', TagSchema);
module.exports = Tag;
