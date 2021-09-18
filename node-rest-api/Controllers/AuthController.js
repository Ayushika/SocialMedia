/** @format */

const userSchema = require("../Models/userModel");
const bcrypt = require("bcryptjs");

const addUser = async (req, res) => {
  const { username, email, password } = req.body;

  try {
    const salt = await bcrypt.genSalt(12);
    const hashedPassword = await bcrypt.hash(password, salt);

    const user = await new userSchema({
      username,
      email,
      password: hashedPassword,
    });
    await user.save();

    res.status(200).json(user);
  } catch (error) {
    res.status(500).json(error);
  }
};

const checkUser = async (req, res) => {
  const { email, password } = req.body;

  try {
    const user = await userSchema.findOne({ email });

    !user && res.status(404).json({ message: "User not found" });

    const isPasswordMatch = await bcrypt.compare(password, user.password);

    !isPasswordMatch && res.status(400).json({ message: "Wrong Password" });

    res.status(200).json({ message: "Login successfully" });
  } catch (error) {
    res.status(500).json(error);
  }
};

module.exports = { addUser, checkUser };
