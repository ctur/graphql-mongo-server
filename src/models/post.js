"use strict";

const mongoose = require("mongoose");

const PostSchema = new mongoose.Schema(
  {
    title: { type: String, default: "" },
    body: { type: String, default: "" },
    author: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      autopopulate: true
    },
    comments: [
      {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Comment",
        autopopulate: true
      }
    ]
  },
  { timestamps: true }
);

PostSchema.plugin(require("mongoose-autopopulate"));
const post = mongoose.model("Post", PostSchema);
module.exports = post;
