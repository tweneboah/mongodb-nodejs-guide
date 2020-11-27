import express from 'express';
import {
  fetchPostsController,
  postController,
} from '../../controllers/postController';

const postRouter = express.Router();

postRouter.post('/create', postController);
postRouter.get('/', fetchPostsController);

export { postRouter };
