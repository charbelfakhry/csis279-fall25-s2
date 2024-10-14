const express = require("express");
const session = require('express-session');
require("dotenv").config();

const bodyParser = require('body-parser');
const cors = require('cors');
const port = process.env.PORT || 3001;

const app = express();
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

app.use(cors());

const users = require('./Routes/userRoutes');
app.use('/api/users', users);

app.listen(port, () => {
    console.log(`my app is listening ${port}`);

})