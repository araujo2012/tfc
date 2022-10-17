import IMatch from '../interfaces/match';
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
}

export default matchService;
