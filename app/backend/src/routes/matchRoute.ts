import { Router } from 'express';
import MatchController from '../controllers/matchController';
import MatchService from '../services/matchService';
import MatchModel from '../database/models/Match';

const matchRoute = Router();

const matchController = new MatchController(new MatchService(MatchModel));

matchRoute.get('/', (req, res, next) => matchController.getAllMatches(req, res, next));

export default matchRoute;
