import { Post } from "../models/post.model.js";

// Creating Posts
export const createPost = async (req, res) => {
  try {
    const { name, description, age } = req.body;

    if (!name || !description || !age) {
      res.status(400).json({
        message: "all fields are required",
      });
    }
    const post = await Post.create({ name, description, age });
    res.status(201).json({
      message: "Post created successfully",
      post,
    });
  } catch (error) {
    res.status(500).json({
      message: "Internal Server error",
      error,
    });
  }
};

// Getall Posts
export const getAllPosts = async (req, res) => {
  try {
    const posts = await Post.find();
    res.status(200).json({ posts });
  } catch (error) {
    res.status.json({
      message: "Internal server error",
      error,
    });
  }
};
