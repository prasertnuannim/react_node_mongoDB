const express = require("express");
const mongoose = require("mongoose");

const morgan = require("morgan");
const cors = require("cors");
const bodyParser = require("body-parser");

const  {readdirSync} = require("fs")
const connectDB = require('./config/db');

const app = express();

//connect db
connectDB()

//Middleware
app.use(morgan("dev"));
app.use(cors());
app.use(bodyParser.json({limit: '10mb'}));


readdirSync('./routes').map((r) => app.use("/api", require(`./routes/${r}`)));

app.listen(3000, () => {
    console.log("Server is running on port 3000");
})