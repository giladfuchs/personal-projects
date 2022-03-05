const express = require("express");
const router = express.Router();
const Author = require("../models/author");
const Post = require("../models/post");
router.get("/", async (req, res) => {
  let search = {};
  if (req.query.name != null && req.query.name !== "")
    search.name = new RegExp(req.query.name, "i");
  try {
    const authors = await Author.find(search);

    res.render("authors/index", { authors: authors, search: req.query });
  } catch (err) {
    res.redirect("/");
  }
});

router.get("/new", (req, res) => {
  res.render("authors/new", { author: new Author() });
});

router.post("/", async (req, res) => {
  try {
    const author = new Author({
      name: req.body.name
    });

    await author.save();
    res.redirect("authors");

    // res.redirect('authors/${newAuthor.id}')
  } catch (author) {
    res.render("authors/new", {
      author: author,
      errorMessage: "Error creating Author"
    });
    console.log("erooe");
  }
});
router.get("/:id/edit", async (req, res) => {
  try {
    const author = await Author.findById(req.params.id);
    res.render("authors/edit", { author: author });
  } catch (error) {
    res.redirect("/author");
  }
});
router.get("/:id", async (req, res) => {
  try {
    const author = await Author.findById(req.params.id);
    const posts = await Post.find({ author: author.id })
      .limit(6)
      .exec();
    res.render("authors/show", {
      author: author,
      posts: posts
    });
  } catch (error) {
    res.redirect("/");
  }
});

router.put("/:id", async (req, res) => {
  let author;
  try {
    author = await Author.findById(req.params.id);
    author.name = req.body.name;
    await author.save();
    res.redirect(`/authors`);
  } catch (error) {
    if (author == null) res.redirect("/");
    else {
      res.render("authors/edit", {
        author: author,
        errorMessage: "error update"
      });
    }
  }
});
router.delete("/:id", async (req, res) => {
  let author;
  try {
    author = await Author.findById(req.params.id);

    await author.remove();
    res.redirect(`/authors`);
  } catch (error) {
    res.redirect("/");
  }
});
module.exports = router;
