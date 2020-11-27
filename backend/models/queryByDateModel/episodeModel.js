import mongoose from 'mongoose';

const episodeSchema = new mongoose.Schema({
  title: String,
  aireAt: {
    type: Date,
  },
});

const Episode = mongoose.model('Episode', episodeSchema);

export { Episode };
