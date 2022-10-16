import { Router } from 'express';
import TeamController from '../controllers/teamController';
import TeamService from '../services/teamService';
import teamModel from '../database/models/Team';

const teamRoute = Router();

const teamController = new TeamController(new TeamService(teamModel));

teamRoute.get('/:id', (req, res, next) => teamController.getTeamById(req, res, next));
teamRoute.get('/', (req, res, next) => teamController.getAllTeams(req, res, next));

export default teamRoute;
