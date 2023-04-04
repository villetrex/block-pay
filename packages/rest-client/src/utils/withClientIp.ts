import { NextApiHandler, NextApiRequest, NextApiResponse } from 'next';

import { getClientIp } from './getClientIp';

export const withClientIp = (handler: NextApiHandler) => {
  return async (request: NextApiRequest, response: NextApiResponse) => {
    const ip = getClientIp(request);

    if (request.method === 'GET') {
      request.query['clientIp'] = ip;
    } else {
      request.body['clientIp'] = ip;
    }
    return handler(request, response);
  };
};
