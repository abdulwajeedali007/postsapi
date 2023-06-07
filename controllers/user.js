import User from "../models/user.js";
import jwt from "jsonwebtoken";

const createWebtoke = (_id) => {
  return jwt.sign({ _id }, process.env.SECRET, { expiresIn: "3d" });
};
export const loginUser = async (req, res) => {
  const { email, password } = await req.body;
  try {
    const user = await User.login(email, password);
    const id = user._id;
    // create a token
    const token = createWebtoke(user._id);
    res.status(200).json({ id, email, token });
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};
export const signupUser = async (req, res) => {
  const { email, password } = await req.body;
  try {
    const user = await User.signup(email, password);
    const id = user._id;
    // create a token
    const token = createWebtoke(user._id);
    res.status(200).json({ id, email, token });
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};
