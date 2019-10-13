"use strict";

const { sign } = require("jsonwebtoken");
const { AuthenticationError } = require("apollo-server-express");
const { JWT_SECRET, JWT_EXPIRY_TIME } = require("../../config/environment");
const pubsub = require("../../config/pubsub");

const ISSUE_TOKEN = "ISSUE_TOKEN";

const UserResolvers = {
  Query: {
    users: async (root, args, { models: { User }, user }) => {
      return User.find();
    }
  },
  Mutation: {
    signUp: async (
      root,
      { input: { email, password, firstName, lastName, address } },
      { models: { User } }
    ) => {
      return User.create({ email, password, firstName, lastName, address });
    },
    login: async (
      root,
      { input: { email, password } },
      { models: { User } }
    ) => {
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

      pubsub.publish(ISSUE_TOKEN, { lastUser: { token, user } });

      return {
        token,
        user
      };
    }
  },
  Subscription: {
    lastUser: {
      subscribe: () => pubsub.asyncIterator([ISSUE_TOKEN])
    }
  }
};

module.exports = UserResolvers;
