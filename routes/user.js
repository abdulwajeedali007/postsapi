import express from "express";

import { loginUser, signupUser } from "../controllers/user.js";
const Router = express.Router();

// @post Router
// @login user
Router.post("/login", loginUser);

// @post Router
// @Register a user
Router.post("/signup", signupUser);

export default Router;
