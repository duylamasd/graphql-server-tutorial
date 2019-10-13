"use strict";

const { gql } = require("apollo-server-express");

const UserTypeDef = require("./user");
const Directives = require("./directives");

const Query = gql`
  type Query {
    _empty: String
  }
  type Mutation {
    null: Boolean
  }

  type Subscription {
    null: Boolean
  }
`;

module.exports = [Directives, UserTypeDef, Query];
