"use strict";

const mongoose = require("mongoose");

const CommentSchema = new mongoose.Schema(
  {
    text: { type: String, default: "" },
    author: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      autopopulate: true
    },
    post: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Post",
      autopopulate: true
    }
  },
  { timestamps: true }
);

CommentSchema.plugin(require("mongoose-autopopulate"));
const comment = mongoose.model("Comment", CommentSchema);
module.exports = comment;
