import mongoose from 'mongoose';

const userSchema = new mongoose.Schema({
  name: {
    type: String,
  },
  email: {
    type: String,
  },
  password: {
    type: String,
  },
  age: {
    type: Number,
  },
  dateOfBith: {
    type: Date,
  },
});

const User = mongoose.model('User', userSchema);

export { User };
