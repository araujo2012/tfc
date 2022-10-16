import { Request, Response } from 'express';
import userService from '../services/userService';

class userController {
  constructor(private service: userService) {}

  async login(req: Request, res: Response) {
    const { email, password } = req.body;
    const result = await this.service.login(email, password);
    if (!result) return res.status(401).json({ message: 'Incorrect email or password' });
    return res.status(200).json(result);
  }

  async getRole(req: Request, res: Response) {
    const { authorization } = req.headers;
    if (!authorization) return res.status(400).json('missing authorization');
    const result = await this.service.getRole(authorization);
    if (result.validToken) {
      return res.status(200).json({ role: result.role });
    }
    return res.status(400).json('Invalid authorization');
  }
}

export default userController;
