const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const temporarySchema = new Schema(
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
    authPass: {
      type: String,
      required: true,
    },
    domain: {
      type: String,
      required: true,
    },

  },
  {
    timestamps: true
  }
);
temporarySchema.index({ createdAt: 1 }, { expireAfterSeconds: 60 * 60 });
module.exports = mongoose.connection.useDb("manager")
  .model("Temporary", temporarySchema);
