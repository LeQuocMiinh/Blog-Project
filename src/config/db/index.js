const mongoose = require('mongoose');

async function connect() {
    await mongoose.connect('mongodb://127.0.0.1/blog', {
        useNewUrlParser: true,
        useUnifiedTopology: true,
      }).then(() => {
        console.log('connected');
    });
}

module.exports = { connect };