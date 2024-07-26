const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const Author = new Schema({
    name: { type: String, maxLength: 255, required: true },
    email: { type: String, maxLength: 255, required: true, unique: true },
    password: { type: String, maxLength: 255, minLength: 8, required: true },
    role: { type: String, enum: ['admin', 'user'], default: 'user' },
}, {
    timestamps: true,
});

module.exports = mongoose.model('Users', Author);