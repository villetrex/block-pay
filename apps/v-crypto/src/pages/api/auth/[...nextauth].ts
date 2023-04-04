// eslint-disable-next-line @typescript-eslint/ban-ts-comment
// @ts-nocheck

import dayjs from '@villetrex/dayjs';
import { NextApiRequest } from 'next';
import NextAuth from 'next-auth';
import CredentialsProvider from 'next-auth/providers/credentials';

import { LoginData } from 'src/generated/graphql';
import AuthService from 'src/services/AuthService';

const providers = [
  CredentialsProvider({
    name: 'Credentials',
    credentials: {
      email: { label: 'email', type: 'text', placeholder: 'jsmith' },
      password: { label: 'Password', type: 'password' },
    },
    authorize: async ({ email, password }) => {
      try {
        const res = await AuthService.signIn({ email, password });
        if (res?.data?.login?.authTokens?.accessToken) {
          return res?.data?.login;
        }
      } catch (error) {
        console.log('error is', error);
      }
    },
  }),
];

const callbacks = {
  jwt: async ({ token, user }: { token: LoginData; user: LoginData }) => {
    if (user) {
      // This will only be executed at login. Each next invocation will skip this part.
      token.authTokens = user.authTokens;
      token.user = user.user;
      return token;
    }

    // If accessTokenExpiry is 24 hours, we have to refresh token before 24 hours pass.
    if (dayjs(token.authTokens.accessTokenExpiry).isAfter(dayjs())) {
      // If the call arrives after 23 hours have passed, we allow to refresh the token.
      token = await AuthService.refreshToken(token.authTokens.accessToken);
      return token;
    }
    // If the token is still valid, just return it.
    return token;
  },
  session: async ({ session, token }) => {
    // Here we pass accessToken to the client to be used in authentication with your API
    session.authtokens = token.authTokens;
    session.user = token.user;
    return session;
  },
};

export const options = {
  providers,
  callbacks,
  pages: {},
  secret: process.env.JWT_SECRET,
};

const Auth = async (req: NextApiRequest, res) => await NextAuth(req, res, options);

export default Auth;
