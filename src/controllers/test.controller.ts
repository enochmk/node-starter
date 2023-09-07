import { Request, Response } from 'express';

export const testGetController = async (req: Request, res: Response) => {
  res.send({
    message: 'Nothing to get',
    hostname: req.headers.host,
    protocol: req.protocol,
    port: req.socket.localPort,
    endpoint: `${req.protocol}://${req.headers.host}/api/mtn/passport/registration/biometric`,
  });
};
