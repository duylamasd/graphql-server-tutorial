"use strict";

const { Schema } = require("mongoose");

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

module.exports = User;
