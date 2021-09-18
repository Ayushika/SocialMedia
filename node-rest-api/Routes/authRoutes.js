/** @format */

const router = require("express").Router();
const { addUser, checkUser } = require("../Controllers/AuthController");

router.post("/register", addUser);
router.post("/login", checkUser);

module.exports = router;
