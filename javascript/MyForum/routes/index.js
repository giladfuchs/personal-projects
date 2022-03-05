const express = require("express");
const router = express.Router();
const Post = require("../models/post");

router.get("/", async (req, res) => {
  let posts;
  try {
    posts = await Post.find()
      .sort({ createdAt: "desc" })
      .limit(10)
      .exec();
  } catch (error) {
    posts = [];
  }
  console.log(posts);

  res.render("index", { posts: posts });
});

module.exports = router;
