import { Request, Response } from 'express';
import teamService from '../services/teamService';

class teamController {
  constructor(private service: teamService) {}

  async getAll(_req: Request, res: Response) {
    const result = await this.service.getAllTeams();
    return res.status(200).json(result);
  }
}

export default teamController;