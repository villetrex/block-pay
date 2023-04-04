import { NextApiHandler, NextApiRequest, NextApiResponse } from 'next';
import { getSession } from 'next-auth/react';

export const withAuth = (handler: NextApiHandler) => {
  return async (request: NextApiRequest, response: NextApiResponse) => {
    const session = await getSession({ req: request });
    if (session) {
      if (request.method === 'GET') {
        request.query['accessToken'] = session.accessToken as string;
      } else {
        request.body['accessToken'] = session.accessToken as string;
      }

      return handler(request, response);
    } else {
      response
        .setHeader('Set-Cookie', 'locale=deleted; path=/; expires=Thu, 01 Jan 1970 00:00:00 GMT')
        .status(401)
        .end();
    }
  };
};
