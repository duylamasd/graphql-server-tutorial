"use strict";

const {
  SchemaDirectiveVisitor,
  AuthenticationError
} = require("apollo-server-express");
const { defaultFieldResolver } = require("graphql");
const { verify } = require("jsonwebtoken");

const { JWT_SECRET } = require("../../config/environment");

class AuthDirective extends SchemaDirectiveVisitor {
  visitObject(object) {
    console.log("auth obj");
    this.ensureFieldsWrapped(object);
  }

  visitFieldDefinition(field, details) {
    const { resolve = defaultFieldResolver } = field;
    field.resolve = async (...args) => {
      const {
        token,
        models: { User }
      } = args[2];
      try {
        const jwtPayload = verify(token, JWT_SECRET);
        if (jwtPayload) {
          const { _id } = jwtPayload;
          const user = await User.findById(_id, { password: false });
          args[2].user = user;
          return resolve.apply(this, args);
        }

        throw new AuthenticationError("Invalid token");
      } catch (e) {
        throw new AuthenticationError(e.message || "Invalid token");
      }
    };
  }

  ensureFieldsWrapped(objectType) {
    const fields = objectType.getFields();
    Object.values(fields).forEach(field => {
      const { resolve = defaultFieldResolver } = field;
      field.resolve = async function(...args) {
        console.log("...field");
        throw new AuthenticationError("unauthenticated");
      };
    });
  }
}

module.exports = AuthDirective;
