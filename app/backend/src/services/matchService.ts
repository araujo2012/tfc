import { IMatch, IGoals } from '../interfaces/match';
import matchModel from '../database/models/Match';
import Team from '../database/models/Team';

class matchService {
  constructor(private model: typeof matchModel) {}

  async getAllMatches(inProgress: unknown) {
    const matches = await this.model.findAll({
      include: [
        { model: Team,
          as: 'teamHome',
          attributes: ['teamName'],
        },
        { model: Team,
          as: 'teamAway',
          attributes: ['teamName'],
        }],
    });
    if (inProgress === 'true') {
      return matches.filter((match) => match.inProgress === 1);
    }
    if (inProgress === 'false') {
      return matches.filter((match) => match.inProgress === 0);
    }
    return matches;
  }

  async createMatch(match: IMatch) {
    const result = await this.model.create(match);
    return result;
  }

  async matchHaveFinished(id: number) {
    await this.model.update({ inProgress: 0 }, { where: { id } });
    return { message: 'Finished' };
  }

  async updateMatchById(id: number, payload: IGoals) {
    const match = await this.model.update(payload, { where: { id } });
    return match;
  }
}

export default matchService;
