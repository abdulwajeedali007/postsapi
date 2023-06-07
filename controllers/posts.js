import mongoose from "mongoose";
import Post from "../models/posts.js";
// @get method
// get all posts
const getAllPosts = async (req, res) => {
  try {
    const posts = await Post.find({}).sort({ createdAt: -1 });
    res.status(200).json(posts);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};

// @get method
// get all my  posts
const getAllmyposts = async (req, res) => {
  const myPost_id = req.user._id;
  try {
    const posts = await Post.find({ user_id: myPost_id }).sort({
      createdAt: -1,
    });
    res.status(200).json(posts);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};

// @get method
// get single post
const getPost = async (req, res) => {
  const id = req.params.id;
  try {
    if (!mongoose.Types.ObjectId.isValid(id)) {
      res.status(404).json({ message: `No such post with this id ${id}` });
    }
    const post = await Post.findById(id);
    // if we doesn't have the post
    if (!post) {
      return res.status(404).json({ mesg: "There is no such post" });
    }
    res.status(200).json(post);
  } catch (error) {
    res.status(404).json({ message: error.message });
  }
};

// @post method
// create post
const createPost = async (req, res) => {
  const user_id = req.user._id;
  const data = await req.body;
  try {
    const createdPost = await Post.create({ ...data, user_id });

    res.status(201).json(createdPost);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

// @patch method
// update a post
const updatePost = async (req, res) => {
  const id = req.params.id;

  try {
    if (!mongoose.Types.ObjectId.isValid(id)) {
      res.status(404).json({ message: `No such post with this id ${id}` });
    }
    const post = await Post.findByIdAndUpdate(
      { _id: id },
      { ...req.body, _id: id },
      { new: true }
    );

    // if we doesn't have the post
    if (!post) {
      return res.status(404).json({ mesg: "There is no such post" });
    }
    res.status(200).json(post);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

// @delete method
// delete a post
const deletePost = async (req, res) => {
  const id = req.params.id;
  try {
    if (!mongoose.Types.ObjectId.isValid(id)) {
      res.status(404).json({ message: `No such post with this id ${id}` });
    }
    const deleteOne = await Post.findByIdAndDelete(id);
    if (!deleteOne) {
      return res.status(404).json({ mesg: "There is no such post" });
    }
    res.status(200).json(deleteOne);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};

export {
  getAllPosts,
  getAllmyposts,
  getPost,
  createPost,
  updatePost,
  deletePost,
};
