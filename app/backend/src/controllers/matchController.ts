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

  async createMatch(req: Request, res: Response, next: NextFunction) {
    try {
      const result = await this.service.createMatch(req.body);
      return res.status(201).json(result);
    } catch (error) {
      next(error);
    }
  }

  async matchHaveFinished(req: Request, res: Response, next: NextFunction) {
    try {
      const { id } = req.params;
      const result = await this.service.matchHaveFinished(parseInt(id, 10));
      return res.status(200).json(result);
    } catch (error) {
      next(error);
    }
  }

  async updateMatchById(req: Request, res: Response, next: NextFunction) {
    try {
      const { id } = req.params;
      const result = await this.service.updateMatchById(parseInt(id, 10), req.body);
      return res.status(200).json(result);
    } catch (error) {
      next(error);
    }
  }
}

export default matchController;
