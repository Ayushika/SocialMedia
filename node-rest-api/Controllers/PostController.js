/** @format */

const mongoose = require("mongoose");
const postSchema = require("../Models/postModel");
const userSchema = require("../Models/userModel");

//CREATE POST
const createPost = async (req, res) => {
  try {
    const post = await new postSchema(req.body);
    await post.save();
    res.status(200).json(post);
  } catch (error) {
    res.status(500).json(error);
  }
};

//GET POST
const getPost = async (req, res) => {
  const { id } = req.params;
  try {
    const post = await postSchema.findById(id);
    res.status(200).send(post);
  } catch (error) {
    res.status(500).json(error);
  }
};

//UPDATE POST
const updatePost = async (req, res) => {
  const { id } = req.params;
  try {
    const post = await postSchema.findById(id);

    if (post.userId === req.body.userId) {
      await post.updateOne({ $set: req.body });
      res.status(200).json({ message: "Post updated successfully" });
    } else {
      res.status(403).json({ message: "You can only update your post" });
    }
  } catch (error) {
    res.status(500).json(error);
  }
};

//LIKE POST
const likePost = async (req, res) => {
  const { id } = req.params;
  try {
    const post = await postSchema.findById(id);
    if (!post.likes.includes(req.body.userId)) {
      await post.updateOne({ $push: { likes: req.body.userId } });
      res.status(200).json({ message: "You liked a post" });
    } else {
      await post.updateOne({ $pull: { likes: req.body.userId } });
      res.status(200).json({ message: "You disliked a post" });
    }
  } catch (error) {
    res.status(500).json(error);
  }
};

//DELETE POST
const deletePost = async (req, res) => {
  const { id } = req.params;

  try {
    const post = await postSchema.findById(id);
    if (post.userId === req.body.userId) {
      await post.deleteOne();
      res.status(200).json({ message: "Post deleted successfully" });
    } else {
      res.status(403).json({ message: "You can only delete your post" });
    }
  } catch (error) {
    res.status(500).json(error);
  }
};

//TIMELINE POSTS
const timelinePost = async (req, res) => {
  try {
    const currentUser = await userSchema.findById(req.body.userId);
    const userPosts = await postSchema.find({ userId: currentUser._id });
    const friendPosts = await Promise.all(
      currentUser.followings.map((friendId) => {
        return postSchema.find({ userId: friendId });
      }),
    );

    res.status(200).json(userPosts.concat(...friendPosts));
  } catch (error) {
    res.status(500).json(error);
  }
};

module.exports = {
  createPost,
  getPost,
  updatePost,
  likePost,
  deletePost,
  timelinePost,
};
