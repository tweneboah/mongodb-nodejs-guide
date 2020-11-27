import mongooe from 'mongoose';

const userSchema = new mongooe.Schema({
  name: String,
  lastActive: Date,
});
