const mongoose = require('mongoose');

async function connect() {
    await mongoose.connect('mongodb://127.0.0.1/blog').then(() => {
        console.log('connected');
    });
}

module.exports = { connect };