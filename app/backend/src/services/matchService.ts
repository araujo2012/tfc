import matchModel from '../database/models/Match';

class matchService {
  constructor(private model: typeof matchModel) {}

  async getAllMatches() {
    const matches = await this.model.findAll();
    return matches;
  }
}

export default matchService;
