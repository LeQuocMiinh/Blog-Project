const mongoose = require('mongoose');
const { generateSlug } = require('../modules/auto-generate-slug');
const Schema = mongoose.Schema;

const PostSchema = new Schema({
    title: { type: String, required: true },
    description: { type: String, required: true },
    content: { type: String, required: true },
    category: [{ type: Schema.Types.ObjectId, ref: 'Category', required: true }],
    tag: [{ type: Schema.Types.ObjectId, ref: 'Tag', required: true }],
    author: { type: String },
    slug: { type: String },
    deleted: {type: Boolean, default: false},
}, { timestamps: true });

generateSlug(PostSchema);

const Post = mongoose.model("Post", PostSchema);
module.exports = Post;
