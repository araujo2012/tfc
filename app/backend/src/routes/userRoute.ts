import { Router } from 'express';
import UserService from '../services/userService';
import UserController from '../controllers/userController';
import UserModel from '../database/models/User';
import { checkEmail, checkPassword } from '../middlewares/userMidleware';

const userRoute = Router();

const userController = new UserController(new UserService(UserModel));

userRoute.post('/', checkEmail, checkPassword, userController.login);
userRoute.get('/validate', userController.getRole);

export default userRoute;
