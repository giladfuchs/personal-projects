const express = require("express");
const ObjectId = require("mongodb").ObjectID;

const router = express.Router();
const path = require("path");
const fs = require("fs");
const Post = require("../models/post");
const Author = require("../models/author");
const imageMimeTypes = ["image/jpeg", "image/png", "images/gif"];

router.get("/", async (req, res) => {
  let query = Post.find();
  if (req.query.title != null && req.query.title !== "")
    query = query.regex("title", new RegExp(req.query.title, "i"));
  if (req.query.publishedAfter != null && req.query.publishedAfter !== "")
    query = query.gte("publishDate", req.query.publishedAfter);
  if (req.query.publishedBefore != null && req.query.publishedBefore !== "")
    query = query.lte("publishDate", req.query.publishedBefore);

  try {
    const posts = await query.exec();
    res.render("posts/index", {
      posts: posts,
      searchOptions: req.query
    });
  } catch (error) {
    res.redirect("/");
  }
});
const form = "new";
// New post Route
router.get("/new", async (req, res) => {
  renderNewPage(res, new Post(), form);
});

// Create post Route
router.post("/", async (req, res) => {
  const post = new Post({
    title: req.body.title,
    author: new ObjectId(req.body.author),
    publishDate: new Date(req.body.publishDate),
    description: req.body.description
  });

  saveCover(post, req.body.cover);
  try {
    await post.save();

    res.redirect(`posts`);
  } catch (e) {
    renderNewPage(res, post, form, true);
  }
});

async function renderNewPage(res, post, form, hasError = false) {
  try {
    const authors = await Author.find({});
    const params = {
      authors: authors,
      post: post
    };
    if (hasError) params.errorMessage = "Error Creating post";
    res.render(`posts/${form}`, params);
  } catch (e) {
    res.redirect("/posts");
  }
}
function saveCover(post, covertEncoded) {
  if (covertEncoded == null) return;
  const cover = JSON.parse(covertEncoded);
  if (cover != null && imageMimeTypes.includes(cover.type)) {
    post.postImage = new Buffer.from(cover.data, "base64");
    post.postImageType = cover.type;
  }
}
router.get("/:id/edit", async (req, res) => {
  try {
    const post = await Post.findById(req.params.id);

    renderNewPage(res, post, "edit");
  } catch (error) {
    res.redirect("/posts");
  }
});
router.get("/:id", async (req, res) => {
  try {
    const post = await Post.findById(req.params.id)
      .populate("author")
      .exec();
    const author = await Author.findById(post.author);
    res.render("posts/show", {
      author: author,
      post: post
    });
  } catch (error) {
    res.redirect("/");
  }
});
router.put("/:id", async (req, res) => {
  let post;
  try {
    post = await Post.findById(req.params.id);
    post.title = req.body.title;
    post.author = new ObjectId(req.body.author);
    post.publishDate = new Date(req.body.publishDate);
    post.description = req.body.description;

    if (req.body.cover != null && req.body.cover !== "")
      saveCover(post, req.body.cover);
    await post.save();
    res.redirect(`/posts`);
  } catch (error) {
    console.log(error);

    if (post == null) res.redirect("/");
    else {
      const authors = await Author.find({});
      res.render("posts/edit", {
        authors: authors,
        post: post,
        errorMessage: "error update"
      });
    }
  }
});
router.delete("/:id", async (req, res) => {
  let post;
  try {
    post = await Post.findById(req.params.id);

    await post.remove();
    res.redirect(`/posts`);
  } catch (error) {
    res.redirect("/");
  }
});
module.exports = router;
