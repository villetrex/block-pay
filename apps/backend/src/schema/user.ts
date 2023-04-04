import gql from 'graphql-tag';

export const user = gql`
  directive @upper on FIELD_DEFINITION | ARGUMENT_DEFINITION | INPUT_FIELD_DEFINITION | ENUM_VALUE
  directive @auth(requires: [UserRole]!) on FIELD_DEFINITION | ARGUMENT_DEFINITION | INPUT_FIELD_DEFINITION | ENUM_VALUE
  directive @hidden on SCALAR | OBJECT | FIELD_DEFINITION | ARGUMENT_DEFINITION | INTERFACE | UNION | ENUM | ENUM_VALUE | INPUT_OBJECT | INPUT_FIELD_DEFINITION

  enum UserRole {
    ADMIN
    USER
    PUBLIC
  }

  input AuthRule {
    role: UserRole!
  }

  type User {
    id: ID
    email: String!
    password: String @hidden
    firstName: String!
    lastName: String!
    country: String!
    state: String!
    city: String!
    role: UserRole!
  }

  type AuthTokens {
    accessToken: String
    accessTokenExpiry: String
    refreshToken: String
  }

  type LoginData {
    user: User
    authTokens: AuthTokens
  }

  type Transaction {
    sender: String @auth(requires: [ADMIN, USER, PUBLIC])
    reciever: String
    spender: String
    createdAt: String
  }

  type Query {
    getUsers: [User]!
    getTransactions: [Transaction]! @auth(requires: [ADMIN])
  }

  type Mutation {
    createUser(
      email: String!
      password: String!
      firstName: String!
      lastName: String!
      country: String!
      state: String!
      city: String!
      role: UserRole!
    ): User
    login(email: String!, password: String!): LoginData
  }

  type Subscription {
    userCreated(firstName: String, email: String!): User
  }
`;
