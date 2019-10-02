"use strict";

const { gql } = require("apollo-server-express");

const UserTypeDef = gql`
  type User {
    _id: String
    email: String
    firstName: String
    lastName: String
    address: String
  }

  type Token {
    token: String!
    user: User
  }

  extend type Query {
    users: [User] @auth(role: "ADMIN")
  }

  extend type Mutation {
    signUp(
      email: String!
      password: String!
      firstName: String!
      lastName: String!
      address: String!
    ): User
    login(email: String!, password: String!): Token
  }
`;

module.exports = UserTypeDef;
