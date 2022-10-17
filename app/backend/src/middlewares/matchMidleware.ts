import { Request, Response, NextFunction } from 'express';
import Team from '../database/models/Team';

const isTeamsTheSame = (req: Request, res: Response, next: NextFunction) => {
  const { homeTeam, awayTeam } = req.body;
  if (!homeTeam || !awayTeam) return res.status(400).json({ message: 'missing fiedls' });
  if (homeTeam === awayTeam) {
    return res.status(401)
      .json({ message: 'It is not possible to create a match with two equal teams' });
  }
  next();
};

const teamExist = async (req: Request, res: Response, next: NextFunction) => {
  const { homeTeam, awayTeam } = req.body;
  if (!homeTeam || !awayTeam) return res.status(400).json({ message: 'missing fiedls' });
  const homeTeamExist = await Team.findByPk(homeTeam);
  const awayTeamExist = await Team.findByPk(awayTeam);
  if (!homeTeamExist || !awayTeamExist) {
    return res.status(404).json({ message: 'There is no team with such id!' });
  }
  next();
};

export {
  isTeamsTheSame,
  teamExist,
};
