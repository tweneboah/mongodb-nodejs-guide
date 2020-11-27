import express from 'express';
import {
  fetchUserController,
  fetchUsersController,
  usersController,
} from '../../controllers/usersController';

const usersRoutes = express.Router();

usersRoutes.post('/register', usersController);
usersRoutes.get('/', fetchUsersController);
usersRoutes.get('/me', fetchUserController);

export { usersRoutes };
