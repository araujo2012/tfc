import teamModel from '../database/models/Team';

class teamService {
  constructor(private model: typeof teamModel) {}

  async getAllTeams() {
    const teams = await this.model.findAll();
    return teams;
  }

  async getTeamByid(id: number) {
    const team = await this.model.findOne({ where: { id } });
    return team;
  }
}

export default teamService;
