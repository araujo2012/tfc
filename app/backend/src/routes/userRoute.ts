import { Router } from 'express';
import UserService from '../services/userService';
import UserController from '../controllers/userController';
import UserModel from '../database/models/User';

const userRoute = Router();

const userController = new UserController(new UserService(UserModel));

userRoute.post('/', userController.login);
