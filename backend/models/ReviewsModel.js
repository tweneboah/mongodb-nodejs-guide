import mongoose from 'mongoose';

const reviewSchema = new mongoose.Schema(
  {
    rating: {
      type: Number,
      min: 1,
      max: 5,
    },

    review: {
      type: String,
    },
    user: {
      type: mongoose.Schema.ObjectId,
      ref: 'User',
    },
    tour: {
      type: mongoose.Schema.ObjectId,
      ref: 'Tour',
      required: [true, 'Review must belong to a Tour'],
    },
  },
  {
    //   This will help us to populate on the outPut because these are virtual properties
    toJSON: {
      virtuals: true,
    },
    toObject: {
      virtuals: true,
    },
  }
);

//populate

///^find/ this means any api from mongoose that begins with find should run the middleware

reviewSchema.pre(/^find/, function (next) {
  this.populate({
    path: 'tour',
  }).populate({
    path: 'user',
    select: 'name, email',
  });
  next();
});

const Review = mongoose.model('Review', reviewSchema);

export { Review };
