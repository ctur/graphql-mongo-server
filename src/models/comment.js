"use strict";

const mongoose = require("mongoose");

const CommentSchema = new mongoose.Schema(
  {
    text: { type: String, default: "" },
    author: { type: mongoose.Schema.Types.ObjectId, ref: "User" },
    post: { type: mongoose.Schema.Types.ObjectId, ref: "Post" }
  },
  { timestamps: true }
);

const comment = mongoose.model("Comment", CommentSchema);
module.exports = comment;
