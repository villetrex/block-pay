import { gql } from '@apollo/client';
import * as Apollo from '@apollo/client';
export type Maybe<T> = T | null;
export type InputMaybe<T> = Maybe<T>;
export type Exact<T extends { [key: string]: unknown }> = { [K in keyof T]: T[K] };
export type MakeOptional<T, K extends keyof T> = Omit<T, K> & { [SubKey in K]?: Maybe<T[SubKey]> };
export type MakeMaybe<T, K extends keyof T> = Omit<T, K> & { [SubKey in K]: Maybe<T[SubKey]> };
const defaultOptions = {} as const;
/** All built-in and custom scalars, mapped to their actual values */
export type Scalars = {
  ID: string;
  String: string;
  Boolean: boolean;
  Int: number;
  Float: number;
};

export type AuthRule = {
  role: UserRole;
};

export type AuthTokens = {
  __typename?: 'AuthTokens';
  accessToken?: Maybe<Scalars['String']>;
  accessTokenExpiry?: Maybe<Scalars['String']>;
  refreshToken?: Maybe<Scalars['String']>;
};

export type LoginData = {
  __typename?: 'LoginData';
  authTokens?: Maybe<AuthTokens>;
  user?: Maybe<User>;
};

export type Mutation = {
  __typename?: 'Mutation';
  createUser?: Maybe<User>;
  login?: Maybe<LoginData>;
};


export type MutationCreateUserArgs = {
  city: Scalars['String'];
  country: Scalars['String'];
  email: Scalars['String'];
  firstName: Scalars['String'];
  lastName: Scalars['String'];
  password: Scalars['String'];
  role: UserRole;
  state: Scalars['String'];
};


export type MutationLoginArgs = {
  email: Scalars['String'];
  password: Scalars['String'];
};

export type Query = {
  __typename?: 'Query';
  getTransactions: Array<Maybe<Transaction>>;
  getUsers: Array<Maybe<User>>;
};

export type Subscription = {
  __typename?: 'Subscription';
  userCreated?: Maybe<User>;
};


export type SubscriptionUserCreatedArgs = {
  email: Scalars['String'];
  firstName?: InputMaybe<Scalars['String']>;
};

export type Transaction = {
  __typename?: 'Transaction';
  createdAt?: Maybe<Scalars['String']>;
  reciever?: Maybe<Scalars['String']>;
  sender?: Maybe<Scalars['String']>;
  spender?: Maybe<Scalars['String']>;
};

export type User = {
  __typename?: 'User';
  city: Scalars['String'];
  country: Scalars['String'];
  email: Scalars['String'];
  firstName: Scalars['String'];
  id?: Maybe<Scalars['ID']>;
  lastName: Scalars['String'];
  password?: Maybe<Scalars['String']>;
  role: UserRole;
  state: Scalars['String'];
};

export enum UserRole {
  Admin = 'ADMIN',
  Public = 'PUBLIC',
  User = 'USER'
}

export type GetUsersQueryVariables = Exact<{ [key: string]: never; }>;


export type GetUsersQuery = { __typename?: 'Query', getUsers: Array<{ __typename?: 'User', id?: string | null, email: string, password?: string | null, firstName: string, lastName: string, country: string, state: string, city: string, role: UserRole } | null> };

export type LoginMutationVariables = Exact<{
  email: Scalars['String'];
  password: Scalars['String'];
}>;


export type LoginMutation = { __typename?: 'Mutation', login?: { __typename?: 'LoginData', authTokens?: { __typename?: 'AuthTokens', accessToken?: string | null, refreshToken?: string | null } | null, user?: { __typename?: 'User', id?: string | null, email: string, password?: string | null, firstName: string, lastName: string, country: string, state: string, city: string, role: UserRole } | null } | null };


export const GetUsersDocument = gql`
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
    `;

/**
 * __useGetUsersQuery__
 *
 * To run a query within a React component, call `useGetUsersQuery` and pass it any options that fit your needs.
 * When your component renders, `useGetUsersQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useGetUsersQuery({
 *   variables: {
 *   },
 * });
 */
export function useGetUsersQuery(baseOptions?: Apollo.QueryHookOptions<GetUsersQuery, GetUsersQueryVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useQuery<GetUsersQuery, GetUsersQueryVariables>(GetUsersDocument, options);
      }
export function useGetUsersLazyQuery(baseOptions?: Apollo.LazyQueryHookOptions<GetUsersQuery, GetUsersQueryVariables>) {
          const options = {...defaultOptions, ...baseOptions}
          return Apollo.useLazyQuery<GetUsersQuery, GetUsersQueryVariables>(GetUsersDocument, options);
        }
export type GetUsersQueryHookResult = ReturnType<typeof useGetUsersQuery>;
export type GetUsersLazyQueryHookResult = ReturnType<typeof useGetUsersLazyQuery>;
export type GetUsersQueryResult = Apollo.QueryResult<GetUsersQuery, GetUsersQueryVariables>;
export function refetchGetUsersQuery(variables?: GetUsersQueryVariables) {
      return { query: GetUsersDocument, variables: variables }
    }
export const LoginDocument = gql`
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
export type LoginMutationFn = Apollo.MutationFunction<LoginMutation, LoginMutationVariables>;

/**
 * __useLoginMutation__
 *
 * To run a mutation, you first call `useLoginMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useLoginMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [loginMutation, { data, loading, error }] = useLoginMutation({
 *   variables: {
 *      email: // value for 'email'
 *      password: // value for 'password'
 *   },
 * });
 */
export function useLoginMutation(baseOptions?: Apollo.MutationHookOptions<LoginMutation, LoginMutationVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useMutation<LoginMutation, LoginMutationVariables>(LoginDocument, options);
      }
export type LoginMutationHookResult = ReturnType<typeof useLoginMutation>;
export type LoginMutationResult = Apollo.MutationResult<LoginMutation>;
export type LoginMutationOptions = Apollo.BaseMutationOptions<LoginMutation, LoginMutationVariables>;