import expressAsyncHandler from 'express-async-handler';
import { User } from '../models/UserModel';

const usersController = expressAsyncHandler(async (req, res) => {
  try {
    const createdUser = await User.create(req.body);
    res.send(createdUser);
  } catch (error) {
    res.status(500).json(error);
  }
});

const fetchUsersController = expressAsyncHandler(async (req, res) => {
  try {
    const users = await User.find().populate('posts').exec();

    res.status(200).json(users);
  } catch (error) {
    res.status(500).json(error);
  }
});

const fetchUserController = expressAsyncHandler(async (req, res) => {
  try {
    const users = await User.findById('5fb3971712d58526096564f4').populate(
      'posts'
    );
    res.status(200).json(users);
  } catch (error) {
    res.status(500).json(error);
  }
});
export { usersController, fetchUsersController, fetchUserController };
