const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const domainchema = new Schema(
  {
    firstName: {
      type: String,
      trim: true,
      required: true,
      maxlength: 32,
    },
    lastName: {
      type: String,
      trim: true,
      required: true,
      maxlength: 32,
    },
    phone: {
      type: String,
      trim: true,
      unique: true,
      required: true,
      maxlength: 11,
    },
    email: {
      type: String,
      trim: true,
      required: true,
      unique: true,
    },
    password: {
      type: String,
      required: true,
    },
    isAdmin: {
      type: Boolean,
      required: true,
      default: true,
    },
    domain: {
      type: String,
      required: true,
    },

  },
  { timestamps: true }
);

module.exports = mongoose.connection.useDb("manager")
  .model("Domain", domainchema);
