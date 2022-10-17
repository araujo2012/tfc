import { Router } from 'express';
import LeaderboardController from '../controllers/leaderboardController';
import LeaderboardService from '../services/leaderboardService';
import MatchModel from '../database/models/Match';
import TeamModel from '../database/models/Team';

const leaderboardRoute = Router();

const leaderboardController = new LeaderboardController(
  new LeaderboardService(TeamModel, MatchModel),
);

leaderboardRoute.get(
  '/home',
  (req, res, next) => leaderboardController.leaderboardHome(req, res, next),
);
leaderboardRoute.get(
  '/away',
  (req, res, next) => leaderboardController.leaderboardAway(req, res, next),
);

export default leaderboardRoute;
