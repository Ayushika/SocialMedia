/** @format */

const userSchema = require("../Models/userModel");
const bcrypt = require("bcryptjs");

//UPDATE USER
const updateUser = async (req, res) => {
  const { id } = req.params;

  req.body.userId !== id &&
    res.status(403).json({ message: "You can only update your profile" });

  if (req.body.password) {
    try {
      const salt = await bcrypt.genSalt(12);
      req.body.password = await bcrypt.hash(req.body.password, salt);
    } catch (error) {
      res.status(500).json(error);
    }
  }

  try {
    const user = await userSchema.findByIdAndUpdate(id, { $set: req.body });

    res.status(200).json({ message: "Account Updated" });
  } catch (error) {
    res.status(500).json(error);
  }
};

//DELETE USER
const deleteUser = async (req, res) => {
  const { id } = req.params;

  req.body.userId !== id &&
    res.status(403).json({ message: "You can only delete your profile" });

  try {
    const user = await userSchema.findByIdAndDelete(id);
    res.status(200).json({ message: "Profile deleted successfully" });
  } catch (error) {
    res.status(500).json(error);
  }
};

//GET USER
const getUser = async (req, res) => {
  const { id } = req.params;

  try {
    const user = await userSchema.findById(id);
    const { password, updatedAt, ...other } = user._doc;

    res.status(200).json(other);
  } catch (error) {
    res.status(500).json(error);
  }
};

//FOLLOW USER
const followUser = async (req, res) => {
  const { id } = req.params;

  if (req.body.userId === id)
    res.status(403).json({ message: "You cant follow yourself" });
  else
    try {
      const user = await userSchema.findById(id);
      const currentUser = await userSchema.findById(req.body.userId);

      if (!user.followers.includes(req.body.userId)) {
        await user.updateOne({ $push: { followers: req.body.userId } });
        await currentUser.updateOne({ $push: { followings: id } });
        res.status(200).json({ message: "User has been followed" });
      } else {
        res.status(403).json({ message: "You already follow this user" });
      }
    } catch (error) {
      res.status(500).json(error);
    }
};

//UNFOLLOW USER
const unfollowUser = async (req, res) => {
  const { id } = req.params;
  if (req.body.userId === id)
    res.status(403).json({ message: "You cant unfollow yourself" });
  else
    try {
      const user = await userSchema.findById(id);
      const currentUser = await userSchema.findById(req.body.userId);

      if (user.followers.includes(req.body.userId)) {
        await user.updateOne({ $pull: { followers: req.body.userId } });
        await currentUser.updateOne({ $pull: { followings: id } });
        res.status(200).json({ message: "User has been unfollowed" });
      } else {
        res.status(403).json({ message: "You dont follow this user" });
      }
    } catch (error) {
      res.status(500).json(error);
    }
};

module.exports = { updateUser, deleteUser, getUser, followUser, unfollowUser };
