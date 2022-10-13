import { Router } from 'express';
import TeamController from '../controllers/teamController';
import TeamService from '../services/teamService';
import teamModel from '../database/models/Team';

const teamRoute = Router();

const teamController = new TeamController(new TeamService(teamModel));

teamRoute.get('/:id', teamController.getAllTeams);
teamRoute.get('/', teamController.getTeamById);

export default teamRoute;
