const mongoose = require("mongoose");
const path = require("path");

const postImageBasePath = "uploads/postImage";

const postSchema = new mongoose.Schema({
  title: {
    type: String,
    required: true
  },
  description: {
    type: String,
    required: true
  },
  publishDate: {
    type: Date,
    required: true
  },

  createdAt: {
    type: Date,
    required: true,
    default: Date.now
  },
  postImage: {
    type: Buffer,
    required: true
  },
  postImageType: {
    type: String,
    required: true
  },
  author: {
    type: mongoose.Schema.Types.ObjectId,
    required: true,
    ref: "Author"
  }
});

postSchema.virtual("postImagePath").get(function() {
  if (this.postImage != null && this.postImageType != null) {
    return `data:${
      this.postImageType
    };charset=utf-8;base64,${this.postImage.toString("base64")}`;
  }
});

module.exports = mongoose.model("Post", postSchema);
module.exports.postImageBasePath = postImageBasePath;
