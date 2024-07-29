import express from "express";
import http from "http";
import bodyParser from "body-parser";
import cookieParser from "cookie-parser";
import comptrssion from "compression";
import cors from "cors";
import mongoose from "mongoose";
import router from "./router";

const app = express();

app.use(cors({
    credentials: true
}));

app.use(comptrssion());
app.use(cookieParser());
app.use(bodyParser.json());

const server = http.createServer(app);

server.listen(3000, () => {
    console.log("Server is running on http://localhost:3000/");
})

const MONGO_URL = "mongodb+srv://nuannimprasert:Z1b2nlEChKeeXpPm@cluster0.8wn3kjd.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0"

mongoose.Promise = Promise;
mongoose.connect(MONGO_URL);
mongoose.connection.on('error', (error:Error) => console.log(error))

app.use('/', router())