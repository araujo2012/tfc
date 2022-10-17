import { NextFunction, Request, Response } from 'express';
import leaderboardService from '../services/leaderboardService';

class leaderboardController {
  constructor(private service: leaderboardService) {}

  async leaderboardHome(_req: Request, res: Response, next: NextFunction) {
    try {
      const result = await this.service.leaderboardHome();
      return res.status(200).json(result);
    } catch (error) {
      next(error);
    }
  }

  async leaderboardAway(_req: Request, res: Response, next: NextFunction) {
    try {
      const result = await this.service.leaderboardAway();
      return res.status(200).json(result);
    } catch (error) {
      next(error);
    }
  }

  async leaderboard(_req: Request, res: Response, next: NextFunction) {
    try {
      const result = await this.service.leaderboard();
      return res.status(200).json(result);
    } catch (error) {
      next(error);
    }
  }
}

export default leaderboardController;
