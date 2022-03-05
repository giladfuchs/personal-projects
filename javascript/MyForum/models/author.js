const mongoose = require("mongoose");
const Post = require("./post");

const authorSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true
  }
});
authorSchema.pre("remove", function(next) {
  Post.find({ author: this.id }, (err, posts) => {
    if (err) next(err);
    else if (posts.length > 0) {
      next(new Error("the author still has books"));
    } else next();
  });
});
module.exports = mongoose.model("Author", authorSchema);
