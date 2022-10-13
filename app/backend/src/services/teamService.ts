import teamModel from '../database/models/Team';

class teamService {
  constructor(private model: typeof teamModel) {}

  async getAllTeams() {
    const teams = await this.model.findAll();
    return teams;
  }
}

export default teamService;