import { NextFunction, Request, Response } from 'express';
import matchService from '../services/matchService';

class matchController {
  constructor(private service: matchService) {}

  async getAllMatches(
    req: Request,
    res: Response,
    next: NextFunction,
  ) {
    try {
      const { inProgress } = req.query;
      const result = await this.service.getAllMatches(inProgress);
      return res.status(200).json(result);
    } catch (error) {
      next(error);
    }
  }
}

export default matchController;
