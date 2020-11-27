import mongoose from 'mongoose';

const userSchema = new mongoose.Schema(
  {
    firstName: {
      type: String,
      required: [true, 'First name is required'],
    },
    lastName: {
      type: String,
      required: [true, 'Last name is required'],
    },
    age: {
      type: Number,
      required: [true, 'Age  is required'],
    },
    tryPeriod: {
      type: Date,
      default: Date.now(),
    },
  },
  {
    toJSON: {
      virtuals: true,
    },
    toObject: {
      virtuals: true,
    },
  }
);

//Let's take this scenario: A user can create many posts therefore we can fetch all posts with it user but in case we want to fetch all the post a user created since we didn't save the values on the user model we have to do virtual populate

//Here we associated a user to post but we didn't  associate a field on the user to fetch all the post so this is what we will do

//virtual populate
userSchema.virtual('posts', {
  ref: 'Post', //
  foreignField: 'author', //The value used in the Post model
  localField: '_id', //required, it represent the current model which is the user
});

userSchema.virtual('fullName').get(function () {
  return this.firstName + ' ' + this.lastName;
});

userSchema.virtual('dob').get(function () {
  return Date.now() - this.age;
});

userSchema.virtual('tryPeriodLeft').get(function () {
  return Date.now() - this.tryPeriod;
});

const User = mongoose.model('User', userSchema);

export { User };
