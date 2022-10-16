import { NextFunction, Request, Response } from 'express';
import teamService from '../services/teamService';

class teamController {
  constructor(private service: teamService) {}

  async getAllTeams(_req: Request, res: Response, next: NextFunction) {
    try {
      const result = await this.service.getAllTeams();
      return res.status(200).json(result);
    } catch (error) {
      next(error);
    }
  }

  async getTeamById(req: Request, res: Response, next: NextFunction) {
    try {
      const { id } = req.params;
      const result = await this.service.getTeamByid(parseInt(id, 10));
      return res.status(200).json(result);
    } catch (error) {
      next(error);
    }
  }
}

export default teamController;
