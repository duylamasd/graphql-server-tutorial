"use strict";

const dotenv = require("dotenv");
dotenv.config();

const express = require("express");
const { ApolloServer } = require("apollo-server-express");
const { connectDatabase } = require("./config/database");
const schema = require("./schema");
const models = require("./models");

const app = express();
const server = new ApolloServer({
  schema,
  context: ({ req, res, connection }) => {
    return { models, req };
  },
  introspection: true,
  playground: true
});
server.applyMiddleware({ app });

connectDatabase()
  .then(() => {
    app.listen(3500, () => {
      console.log("App started");
    });
  })
  .catch(e => {
    console.error(e);
    process.exit(1);
  });
