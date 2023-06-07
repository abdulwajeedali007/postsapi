import express from "express";
const app = express();
import mongoose from "mongoose";
import bodyParser from "body-parser";
import cors from "cors";

import dotenv from "dotenv";
dotenv.config();

import postRouter from "./routes/posts.js";
import userRouter from "./routes/user.js";
const PORT = process.env.PORT || 4000;
const URI = process.env.URI;

//Middleware
app.use(cors());
app.use(bodyParser.json({ limit: "50mb" }));
app.use(bodyParser.urlencoded({ limit: "50mb", extended: true }));
app.use(express.json());
app.use(express.json());
app.use((req, res, next) => {
  // path ==> api/v1 and method ==> get
  console.log("request path", req.path, "request method", req.method);
  next();
});

//Posts Routes
app.use("/api/v1/posts", postRouter);
//User Routes
app.use("/api/v1/users", userRouter);
// database connection &  server start.
const start = async () => {
  try {
    await mongoose.connect(URI);
    app.listen(PORT, (err) => {
      if (err) console.log(err);
      console.log("server connected at PORT no " + PORT);
    });
  } catch (error) {
    console.log(error);
  }
};

start();
