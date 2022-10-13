import { Request, Response } from 'express';
import teamService from '../services/teamService';

class teamController {
  constructor(private service: teamService) {}

  async getAllTeams(_req: Request, res: Response) {
    const result = await this.service.getAllTeams();
    return res.status(200).json(result);
  }

  async getTeamById(req: Request, res: Response) {
    const { id } = req.params;
    const result = await this.service.getTeamByid(parseInt(id, 10));
    return res.status(200).json(result);
  }
}

export default teamController;
