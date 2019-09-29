"use strict";

const { Schema, model } = require("mongoose");
const { hash, compareSync } = require("bcrypt");

const SALT = 12;
const MODEL_NAME = "User";
const COLLECTION_NAME = "Users";

const User = new Schema(
  {
    email: String,
    password: String,
    firstName: String,
    lastName: String,
    address: String
  },
  {
    _id: true,
    timestamps: true,
    versionKey: false
  }
);

User.pre("save", async function(next) {
  const user = this;
  if (!user.isModified("password")) {
    return next();
  }

  const hashedPassword = await hash(user.password, SALT);
  if (hashedPassword) {
    user.password = hashedPassword;
    return next();
  }
});

User.methods.comparePassword = function(candidate) {
  return compareSync(candidate, this.password);
};

module.exports = model(MODEL_NAME, User, COLLECTION_NAME);
