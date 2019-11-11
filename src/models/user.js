"use strict";

const mongoose = require("mongoose");

const UserSchema = new mongoose.Schema(
  {
    name: { type: String, default: "" },
    email: { type: String, default: "" },
    password: { type: String, default: "" },
    posts: [
      { type: mongoose.Schema.Types.ObjectId, ref: "Post", autopopulate: true }
    ],
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

UserSchema.plugin(require("mongoose-autopopulate"));
UserSchema.index({ email: 1 }, { unique: true });
const user = mongoose.model("User", UserSchema);
module.exports = user;
