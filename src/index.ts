import express from "express";
import http from "http";
import bodyParser from "body-parser";
import cookieParser from "cookie-parser";
import compression from "compression";
import cors from "cors";
import mongoose from "mongoose";

import v1Router from "./v1/router";

export const MONGO_URL =
  "mongodb+srv://mkhotami:mkhotami@mydbcluster.zlvfqus.mongodb.net/api-mongo-ts?retryWrites=true&w=majority";

const app = express();

app.use(cors());

app.use(compression());
app.use(cookieParser());
app.use(bodyParser.json());

const server = http.createServer(app);

app.get("/", (req, res) => {
  res.send("hello");
});

app.use("/v1", v1Router);

server.listen(8080, () => {
  console.log("Server is running on http://localhost:8080");
});

mongoose.Promise = Promise;
mongoose.connect(MONGO_URL).then(() => console.log("MongoDB connected"));
mongoose.connection.on("error", (error: Error) => console.log(error));
