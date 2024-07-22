const mongoose = require('mongoose');
const { generateSlug } = require('../modules/auto-generate-slug');
const Schema = mongoose.Schema;

const PostSchema = new Schema({
    title: { type: String, required: true },
    description: { type: String, required: true },
    content: { type: String, required: true },
    category: [{ type: Schema.Types.ObjectId, ref: 'Category' }],
    tag: [{ type: Schema.Types.ObjectId, ref: 'Tag' }],
    author: { type: String },
    slug: {type: String}
}, { timestamps: true });

generateSlug(PostSchema);

const Post = mongoose.model("Post", PostSchema);
module.exports = Post;
