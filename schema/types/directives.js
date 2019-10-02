"use strict";

const { gql } = require("apollo-server-express");

const DirectivesType = gql`
  directive @auth(role: String) on OBJECT | FIELD_DEFINITION
`;

module.exports = DirectivesType;
