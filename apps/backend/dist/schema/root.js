"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.root = void 0;
exports.root = `#graphql
  scalar EmailAddress
  scalar Currency
  scalar DateTime
  scalar JSON
  scalar URL
  scalar NonEmptyString
  type Query
  type Mutation
  type Money {
    value: NonEmptyString!
    currency: Currency!
  }
`;
