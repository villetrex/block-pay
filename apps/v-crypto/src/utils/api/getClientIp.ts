import { IncomingMessage } from 'http';

import { NextApiRequest } from 'next';

export const getClientIp = (req: NextApiRequest | IncomingMessage) => {
  let ip;
  if (req?.headers['x-original-forwarded-for']) {
    ip = (req.headers['x-original-forwarded-for'] as string).split(',')[0];
  } else if (req?.headers['x-forwarded-for']) {
    ip = (req.headers['x-forwarded-for'] as string).split(',')[0];
  } else if (req.socket) {
    ip = req.socket.remoteAddress;
  } else {
    ip = req.connection.remoteAddress;
  }
  return ip;
};
