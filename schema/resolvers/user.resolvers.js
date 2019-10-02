"use strict";

const { sign } = require("jsonwebtoken");
const { AuthenticationError } = require("apollo-server-express");
const { JWT_SECRET, JWT_EXPIRY_TIME } = require("../../config/environment");

const UserResolvers = {
  Query: {
    users: async (root, args, { models: { User }, user }) => {
      console.log(user);
      return User.find();
    }
  },
  Mutation: {
    signUp: async (
      root,
      { email, password, firstName, lastName, address },
      { models: { User } }
    ) => {
      return User.create({ email, password, firstName, lastName, address });
    },
    login: async (root, { email, password }, { models: { User } }) => {
      const user = await User.findOne({ email });
      if (!user) {
        throw new AuthenticationError("Invalid credentials");
      }

      const isPasswordMatch = user.comparePassword(password);
      if (!isPasswordMatch) {
        throw new AuthenticationError("Invalid credentials");
      }

      const { _id } = user;
      const token = sign({ _id }, JWT_SECRET, {
        algorithm: "HS256",
        expiresIn: JWT_EXPIRY_TIME
      });

      return {
        token,
        user
      };
    }
  }
};

module.exports = UserResolvers;
