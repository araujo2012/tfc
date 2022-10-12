import { Request, Response } from 'express';
import userService from '../services/userService';

class userController {
  constructor(private service: userService) {}

  async login(req: Request, res: Response) {
    const result = await this.service.login(req.body);
    return res.status(200).json(result);
  }
}

export default userController;
