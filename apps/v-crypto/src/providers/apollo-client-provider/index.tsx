import { ApolloClient, ApolloProvider, HttpLink, InMemoryCache, split } from '@apollo/client';
import { GraphQLWsLink } from '@apollo/client/link/subscriptions';
import { getMainDefinition } from '@apollo/client/utilities';
import { createClient } from 'graphql-ws';
import { FC, PropsWithChildren } from 'react';

import { isBrowser } from 'src/utils/platform';

const GRAPHQL_WS_ENDPOINT = process.env.NEXT_PUBLIC_GRAPHQL_WS_ENDPOINT;
const GRAPHQL_HTTP_ENDPOINT = process.env.NEXT_PUBLIC_GRAPHQL_HTTP_ENDPOINT;

const httpLink = new HttpLink({
  uri: GRAPHQL_HTTP_ENDPOINT,
});

const wsLink =
  isBrowser() &&
  new GraphQLWsLink(
    createClient({
      url: GRAPHQL_WS_ENDPOINT,
      connectionParams: {
        // Authorization: user.authToken,
      },
    }),
  );

// The split function takes three parameters:
// * A function that's called for each operation to execute
// * The Link to use for an operation if the function returns a "truthy" value
// * The Link to use for an operation if the function returns a "falsy" value
const splitLink =
  isBrowser && Boolean(wsLink)
    ? split(
        ({ query }) => {
          const definition = getMainDefinition(query);
          return definition.kind === 'OperationDefinition' && definition.operation === 'subscription';
        },
        wsLink,
        httpLink,
      )
    : httpLink;

export const graphqlClient = new ApolloClient({
  link: splitLink,
  cache: new InMemoryCache(),
  name: 'ville-web-client',
  version: '0.0.0',
  queryDeduplication: false,
  defaultOptions: {
    watchQuery: {
      fetchPolicy: 'cache-and-network',
    },
  },
});

export const GraphqlQueryProvider: FC<PropsWithChildren> = ({ children }) => (
  <ApolloProvider client={graphqlClient}>{children}</ApolloProvider>
);
