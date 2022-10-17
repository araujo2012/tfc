import { Response, NextFunction } from 'express';
import IRequestWithUser from '../interfaces/request';
import { decodeToken } from '../helpers/token';

const isValidToken = (req: IRequestWithUser, res: Response, next: NextFunction) => {
  const { authorization } = req.headers;
  if (!authorization) return res.status(400).json('missing authorization');
  decodeToken(req, authorization);
  next();
};

export default isValidToken;
