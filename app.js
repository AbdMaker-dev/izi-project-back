const express = require('express');
const dotenv = require('dotenv');
const cors = require('cors');

dotenv.config();

const app = express();

app.use(cors());
app.use(express.urlencoded({ extended: false }));
app.use(express.json());


module.exports = app;