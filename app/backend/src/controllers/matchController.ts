import { NextFunction, Request, Response } from 'express';
import matchService from '../services/matchService';

class matchController {
  constructor(private service: matchService) {}

  async getAllMatches(_req: Request, res: Response, next: NextFunction) {
    try {
      const result = await this.service.getAllMatches();
      return res.status(200).json(result);
    } catch (error) {
      next(error);
    }
  }
}

export default matchController;
