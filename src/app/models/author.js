const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const Author = new Schema({
    name: { type: String, maxLength: 255 },
    email: { type: String, maxLength: 255 },
    password: { type: String, maxLength: 255 , minLength: 8},
    role: { type: String, enum: ['admin', 'user'], default: 'user' },
}, {
    timestamps: true,
});

module.exports = mongoose.model('Users', Author);