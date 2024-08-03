const mongoose = require('mongoose');
const { ServerApiVersion } = require('mongodb');
const uri = "mongodb+srv://10thgs2602:4D8AI0Hq7Dsy3MqR@blogs-project.xrifqxw.mongodb.net/?retryWrites=true&w=majority&appName=Blogs-Project";

async function connectMongoose() {
    try {
        // Connect to MongoDB Atlas using Mongoose
        await mongoose.connect(uri, {
            serverApi: ServerApiVersion.v1,
            dbName: "blogs",
            keepAlive: true,
            // Add any other Mongoose options here if needed
        });
        console.log("Successfully connected to MongoDB Atlas using Mongoose!");
    } catch (error) {
        console.error('Error connecting to MongoDB with Mongoose:', error);
    }
}

module.exports = { connectMongoose };
