const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const PostViewSchema = new Schema({
    postId: { type: Schema.Types.ObjectId, ref: 'Post', required: true },
    dailyViews: [
        {
            date: { type: Date, required: true },
            views: { type: Number, required: true, default: 0 }
        }
    ],
}, { timestamps: true });

const PostViews = mongoose.model('PostViews', PostViewSchema);

module.exports = PostViews;
