import { Router } from 'express';
import TeamController from '../controllers/teamController';
import teamService from '../services/teamService';
import teamModel from '../database/models/Team';

const teamRoute = Router();

const teamController = new TeamController(new teamService(teamModel));

teamRoute.get('/', teamController.getAll);

export default teamRoute;