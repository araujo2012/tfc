import { Router } from 'express';
import UserService from '../services/userService';
import UserController from '../controllers/userController';
import UserModel from '../database/models/User';
import { checkEmail, checkPassword } from '../middlewares/userMidleware';

const userRoute = Router();

const userService = new UserService(UserModel);
const userController = new UserController(userService);

userRoute
  .post('/', checkEmail, checkPassword, (req, res, next) => userController.login(req, res, next));
userRoute.get('/validate', (req, res, next) => userController.getRole(req, res, next));

export default userRoute;
