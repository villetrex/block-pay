import { ApolloClient, HttpLink, InMemoryCache, OperationVariables } from '@apollo/client';

import getCasinoGameCategories from 'src/graphql/getCasinoGameCategories.gql';

class StrapiService {
  private client;

  constructor() {
    this.client = new ApolloClient({
      cache: new InMemoryCache({
        typePolicies: {},
      }),
      link: new HttpLink({
        uri: `${process.env.NEXT_PUBLIC_STRAPI_API_URL}/graphql/`,
      }),
    });
  }

  getCasinoGameCategories = () => this.client.query<Response, OperationVariables>({ query: getCasinoGameCategories });
}

export default new StrapiService();
