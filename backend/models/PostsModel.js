import mongoose from 'mongoose';

const postSchema = new mongoose.Schema({
  title: {
    type: String,
    required: [true, 'Post title is required'],
  },
  description: {
    type: String,
    required: [true, 'Post description is required'],
  },
  author: {
    type: mongoose.Types.ObjectId,
    ref: 'User',
  },
  comments: {
    type: mongoose.Types.ObjectId,
    ref: 'Comments',
  },
});

const Post = mongoose.model('Post', postSchema);

export { Post };
