/** @format */

const router = require("express").Router();
const userSchema = require("../Models/userModel");

//REGISTER
router.get("/register", async (req, res) => {
  try {
    const user = await new userSchema({
      username: "john",
      email: "john@gmail.com",
      password: "12345678",
    });
    await user.save();
    res.send("success");
  } catch (error) {
    console.log(error);
  }
});

module.exports = router;
