
const express = require('express');
const route = require('./src/routes');

const path = require('path');
const app = express();
const port = 4000;

const db = require('./src/config/db');
const cors = require('cors');
db.connect();

app.use(express.urlencoded({ extended: true })); //log data object
app.use(express.json());
app.use(cors());

route(app);

app.listen(port, () => {
    console.log(`Example app listening at http://localhost:${port}`);
});


