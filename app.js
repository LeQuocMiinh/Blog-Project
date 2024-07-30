// quản lý các biến môi trường
require('dotenv').config();
const errorNotFound = require("./src/app/middlewares/not-found-error");
const errorHandler = require("./src/app/middlewares/error-handler");
const express = require('express');
const route = require('./src/routes/app');
const app = express();

//kết nối database
const db = require('./src/config/db');
const cors = require('cors');
db.connectMongoose();

//log data object
app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.use(cors());

route(app);

// Khởi động server
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});

// catch errors
app.use(errorNotFound);
app.use(errorHandler);
