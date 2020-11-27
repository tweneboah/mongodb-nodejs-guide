import mongoose from 'mongoose';

const commentSchema = new mongoose.Schema({
  description: {
    type: String,
  },
  author: {},
  posts: {},
});

const Comment = mongoose.model('Comment', commentSchema);

export { Comment };
