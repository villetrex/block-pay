import { gql } from '@apollo/client';

gql`
  query GetUsers {
    getUsers {
      id
      email
      password
      firstName
      lastName
      country
      state
      city
      role
    }
  }
  mutation Login($email: String!, $password: String!) {
    login(email: $email, password: $password) {
      authTokens {
        accessToken
        refreshToken
      }
      user {
        id
        email
        password
        firstName
        lastName
        country
        state
        city
        role
      }
    }
  }
`;
