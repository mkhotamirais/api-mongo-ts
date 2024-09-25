import express from "express";
import cookieParser from "cookie-parser";
import cors from "cors";
import "dotenv/config";
import db from "./config";
import { corsOptions, credentials } from "./mw";

import v1Router from "./v1/router";

const app = express();
const port = process.env.PORT || 3000;

app.use(credentials); // --- built-in middleware
app.use(cors(corsOptions)); // mw for 'content-type: application/x-www-form-urlencoded' / form data
// app.use(cors());
app.use(express.json()); // mw for json
app.use(express.urlencoded({ extended: true })); // mw for cookies
app.use(cookieParser()); // mw for cookiescookieParser());

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
