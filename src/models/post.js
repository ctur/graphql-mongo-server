"use strict";

const mongoose = require("mongoose");

const PostSchema = new mongoose.Schema(
  {
    title: { type: String, default: "" },
    body: { type: String, default: "" },
    author: {type: mongoose.Schema.Types.ObjectId, ref: "User"}
  },
  { timestamps: true }
);

const post = mongoose.model("Post", PostSchema);
module.exports = post;
