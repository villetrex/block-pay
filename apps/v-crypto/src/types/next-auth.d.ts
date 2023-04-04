declare module 'next-auth' {
  /**
   * Returned by `useSession`, `getSession` and received as a prop on the `SessionProvider` React Context
   */
  type Session = {
    user: User;
    accessToken: string;
    expiresIn: string;
    expires: string;
    refreshToken: string;
    accessTokenExpires: number;
    locale?: string;
    error?: any;
  };
}
