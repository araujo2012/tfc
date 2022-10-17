import { Router } from 'express';
import MatchController from '../controllers/matchController';
import MatchService from '../services/matchService';
import MatchModel from '../database/models/Match';
import isValidToken from '../middlewares/tokenValidation';
import { isTeamsTheSame, teamExist } from '../middlewares/matchMidleware';

const matchRoute = Router();

const matchController = new MatchController(new MatchService(MatchModel));

matchRoute.get('/', (req, res, next) => matchController.getAllMatches(req, res, next));
matchRoute.post(
  '/',
  isValidToken,
  isTeamsTheSame,
  teamExist,
  (req, res, next) => matchController.createMatch(req, res, next),
);
matchRoute.patch(
  '/:id/finish',
  (req, res, next) => matchController.matchHaveFinished(req, res, next),
);
matchRoute.patch(
  '/:id',
  (req, res, next) => matchController.updateMatchById(req, res, next),
);

export default matchRoute;
