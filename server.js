"use strict";

const dotenv = require("dotenv");
dotenv.config();

const http = require("http");
const express = require("express");
const { ApolloServer } = require("apollo-server-express");

const { connectDatabase } = require("./config/database");
const schema = require("./schema");
const models = require("./models");

const app = express();
const server = new ApolloServer({
  schema,
  context: ({ req, res, connection }) => {
    let token = "";
    if (req) {
      token = req.headers.authorization;
    }
    return { models, token };
  },
  introspection: true,
  playground: true
});
server.applyMiddleware({ app, path: "/graphql" });

const httpServer = http.createServer(app);
server.installSubscriptionHandlers(httpServer);

connectDatabase()
  .then(() => {
    httpServer.listen(3500, () => {
      console.log("App started");
    });
  })
  .catch(e => {
    console.error(e);
    process.exit(1);
  });
