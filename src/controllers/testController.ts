import { Request, Response } from 'express';

export const testGetController = async (req: Request, res: Response) => {
  res.send({
    message: 'Nothing to get',
  });
};
