import { NextFunction, Request, Response } from 'express';
import userService from '../services/userService';
import { decodeToken } from '../helpers/token';

class userController {
  constructor(private service: userService) {}

  async login(req: Request, res: Response, next: NextFunction) {
    try {
      const { email, password } = req.body;
      const result = await this.service.login(email, password);
      if (!result) return res.status(401).json({ message: 'Incorrect email or password' });
      return res.status(200).json(result);
    } catch (error) {
      next(error);
    }
  }

  async getRole(req: Request, res: Response, next: NextFunction) {
    try {
      const { authorization } = req.headers;
      if (!authorization) return res.status(400).json('missing authorization');
      decodeToken(authorization);
      const { user } = req.body;
      const result = await this.service.getRole(user);
      if (!result) {
        return res.status(400).json('Invalid authorization');
      }
      return res.status(200).json(result);
    } catch (error) {
      next(error);
    }
  }
}

export default userController;
