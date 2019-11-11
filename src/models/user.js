"use strict";

const mongoose = require("mongoose");

const UserSchema = new mongoose.Schema(
  {
    name: { type: String, default: "" },
    email: { type: String, default: "" },
    password: { type: String, default: "" },
    posts: [{ type: mongoose.Schema.Types.ObjectId, ref: "Post" }],
    comments: [{ type: mongoose.Schema.Types.ObjectId, ref: "Comment" }]
  },
  { timestamps: true }
);

UserSchema.index({ email: 1 }, { unique: true });
const user = mongoose.model("User", UserSchema);
module.exports = user;
