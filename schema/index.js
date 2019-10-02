"use strict";

const { makeExecutableSchema } = require("graphql-tools");

const typeDefs = require("./types");
const resolvers = require("./resolvers");
const { AuthDirective } = require("./directives");

module.exports = makeExecutableSchema({
  typeDefs,
  resolvers,
  schemaDirectives: {
    auth: AuthDirective
  }
});
