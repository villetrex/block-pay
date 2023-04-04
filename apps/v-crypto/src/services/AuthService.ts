import { LoginDocument, LoginMutationResult, LoginMutationVariables } from 'src/generated/graphql';
import { graphqlClient } from 'src/providers/apollo-client-provider';
import { convertObjectKeysToCamelCase } from 'src/utils/camelize';

export enum AuthProvider {
  CREDENTIALS = 'CREDENTIALS',
}

class AuthService {
  private client;

  constructor() {
    this.client = graphqlClient;
  }

  signIn = async ({ email, password }: { email: string; password: string }): Promise<LoginMutationResult> =>
    await this.client
      .mutate<LoginMutationResult, LoginMutationVariables>({
        mutation: LoginDocument,
        variables: { email, password },
      })
      .then(response => convertObjectKeysToCamelCase(response));

  // update below code for token refresh
  refreshToken = (accessToken: string) =>
    this.client
      .mutate<LoginMutationResult, LoginMutationVariables>({
        mutation: LoginDocument,
        variables: { accessToken },
      })
      .then(response => convertObjectKeysToCamelCase(response));
}

export default new AuthService();
