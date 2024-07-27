const express = require("express");
const mongoose = require("mongoose");

const morgan = require("morgan");
const cors = require("cors");
const bodyParser = require("body-parser");

const connectDB = require('./config/db');

const app = express();
connectDB()
app.use(morgan("dev"));

app.listen(3000, () => {
    console.log("Server is running on port 3000");
})