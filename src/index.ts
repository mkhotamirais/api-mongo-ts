import express from "express";
import bodyParser from "body-parser";
import cookieParser from "cookie-parser";
import compression from "compression";
import cors from "cors";
import "dotenv/config";
import db from "./config";

import v1Router from "./v1/router";

const app = express();
const port = process.env.PORT || 3000;

app.use(cors());

app.use(compression());
app.use(cookieParser());
app.use(bodyParser.json());

app.get("/", (req, res) => {
  res.send("welcome to api mongo ts server");
});

app.use("/v1", v1Router);

db.then(() => {
  console.log("Connected to MongoDB");
  app.listen(port, () => {
    console.log(`Server running in development mode at http://localhost:${port}`);
  });
}).catch((err) => {
  console.error("Failed to connect to MongoDB:", err);
});

export default app;
