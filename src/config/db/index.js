const mongoose = require('mongoose');

async function connect() {
    await mongoose.connect('mongodb://127.0.0.1/F8_learning_web').then(() => {
        console.log('connected');
    });
}

module.exports = { connect };