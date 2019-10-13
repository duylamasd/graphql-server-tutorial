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
    users: [User]
  }

  input SignUpInput {
    email: String!
    password: String!
    firstName: String!
    lastName: String!
    address: String!
  }

  input LoginInput {
    email: String!
    password: String!
  }

  extend type Mutation {
    signUp(input: SignUpInput): User
    login(input: LoginInput): Token
  }

  extend type Subscription {
    lastUser: Token
  }
`;

module.exports = UserTypeDef;
