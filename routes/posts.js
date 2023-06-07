import express from "express";
const Router = express.Router();
import {
  getAllPosts,
  getAllmyposts,
  getPost,
  createPost,
  updatePost,
  deletePost,
} from "../controllers/posts.js";

// @get Router
// @get all posts
Router.get("/", getAllPosts);

// adding middleware
import authMiddleware from "../middleware/authMiddleware.js";
Router.use(authMiddleware);

// @get Router
// @get all my  posts
Router.get("/myposts", getAllmyposts);

// @get Router
// @get get a post
Router.get("/:id", getPost);

// @post Router
// @post create a post
Router.post("/", createPost);

// @put Router
// @put update a post
Router.patch("/:id", updatePost);

// @delete Router
// @delete delete a post
Router.delete("/:id", deletePost);

export default Router;
