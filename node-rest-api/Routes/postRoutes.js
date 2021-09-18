/** @format */

const router = require("express").Router();
const {
  createPost,
  deletePost,
  getPost,
  updatePost,
  likePost,
  timelinePost,
} = require("../Controllers/PostController");

router.post("/", createPost);
router.delete("/:id", deletePost);
router.get("/:id", getPost);
router.put("/:id", updatePost);
router.put("/:id/like", likePost);
router.get("/timeline/all", timelinePost);

module.exports = router;
