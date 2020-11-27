import expressAsyncHandler from 'express-async-handler';
import { Post } from '../models/PostsModel';

const postController = expressAsyncHandler(async (req, res) => {
  try {
    const createdPost = await Post.create(req.body);
    res.status(200).json({
      _id: createdPost._id,
      title: createdPost.title,
      description: createdPost.description,
    });
  } catch (error) {
    res.json(error);
  }
});

const fetchPostsController = expressAsyncHandler(async (req, res) => {
  console.log('FETCH POST');
  try {
    const posts = await Post.find({})
      .select('title description')
      .populate('author')
      .exec();
    console.log(posts);
    res.status(200).json(posts);
  } catch (error) {
    res.status(500).json(error);
  }
});

export { postController, fetchPostsController };
