"use strict";

const { gql } = require("apollo-server-express");
const UserTypeDef = require("./user");

const Query = gql`
  type Query {
    _empty: String
  }
  type Mutation {
    null: Boolean
  }
`;

module.exports = [UserTypeDef, Query];
