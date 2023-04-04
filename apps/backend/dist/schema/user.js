"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.user = void 0;
const graphql_tag_1 = __importDefault(require("graphql-tag"));
exports.user = (0, graphql_tag_1.default) `
  directive @auth(rules: [AuthRule!]!) on OBJECT | FIELD_DEFINITION

  directive @canPerform(isBrandOwner: Boolean! = false, roles: [UserRole!]! = []) on FIELD | FIELD_DEFINITION

  directive @upper on FIELD_DEFINITION | ARGUMENT_DEFINITION | INPUT_FIELD_DEFINITION | ENUM_VALUE

  enum UserRole {
    ADMIN
    BRAND_ADMIN
    BRAND_CUSTOMER_SUPPORT
    SHOPIFY_SESSION
    USER
    PUBLIC
  }

  enum UserPermissions {
    READ
    WRITE
  }
  input AuthRule {
    role: UserRole!
  }

  type User {
    id: ID
    email: String @upper
    role: UserRole
    firstName: String
    lastName: String
  }

  type AdminModel @auth(rules: [{ role: ADMIN }]) {
    item: String!
  }

  type BrandAdminModel @auth(rules: [{ role: BRAND_ADMIN }]) {
    item: String!
  }

  type BrandCustomerSupport @auth(rules: [{ role: BRAND_CUSTOMER_SUPPORT }]) {
    item: String!
  }

  type Public @auth(rules: [{ role: PUBLIC }]) {
    item: String!
  }
  type Query {
    getUser(firstName: String, email: String!): User!
  }

  type Subscription {
    userCreated(firstName: String, email: String!): User
  }
`;
