const mongoose = require('mongoose');
const { generateSlug } = require('../../utils/auto-generate-slug');
const Schema = mongoose.Schema;

const PostSchema = new Schema({
    title: { type: String, required: true },
    description: { type: String, required: true },
    image: { type: String, default: null },
    content: { type: String, required: true },
    category: [{ type: Schema.Types.ObjectId, ref: 'Category', required: true }],
    tag: [{ type: Schema.Types.ObjectId, ref: 'Tag', required: true }],
    slug: { type: String },
    status: { type: String, enum: ['published', 'privated', 'draft'], default: 'draft' },
    deleted: { type: Boolean, default: false },
    views: { type: Number, default: 0 }
}, { timestamps: true });

generateSlug(PostSchema);

const Post = mongoose.model("Post", PostSchema);
module.exports = Post;
