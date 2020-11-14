// import mongoose from 'mongoose';
// import { User } from './UserModel';

// const tourSchema = new mongoose.Schema(
//   {
//     name: {
//       type: String,
//       required: [true, 'A tour must have a name'],
//       unique: true,
//       trim: true,
//     },
//     rating: {
//       type: Number,
//       default: 0,
//     },
//     images: {
//       type: String,
//     },
//     slug: {
//       type: String,
//     },
//     groupSize: {
//       type: Number,
//       required: [true, 'Must have a group size'],
//       maxlength: 3,
//     },
//     summary: {
//       type: String,
//       trim: true,
//     },
//     startDate: [Date],
//     secretTour: {
//       type: Boolean,
//       default: false,
//     },
//     guides: [Array]
//   },

//   { timestamps: true }
// );

// //  VIRTUAL FIELDS
// //There are fields that are on our schema but no persist in our database

// tourSchema.virtual('durationInWeeks').get(function () {
//   return this.duration / 7;
// });

// //2. QUERY MIDDLEWARE
// userSchema.pre('find', function (next) {
//   //here this refers to the query object
//   //Practical example is hidding certain tours from group of people or VIP Tours

//   //$ne = not equal to
//   this.find({ secretTour: { $ne: true } });
//   next();
// });

// tourSchema.pre('save', function (next) {
//  const guidesPromises =  this.guides.map(async id => await User.findById(id));
//  this.guides = await Promise.all(guidesPromises);
//   next();
// });

// const Tour = mongoose.model('Tour', tourSchema);

// export { Tour };

import mongoose from 'mongoose';
import { User } from './UserModel';

const tourSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: [true, 'A tour must have a name'],
      unique: true,
      trim: true,
    },
    rating: {
      type: Number,
      default: 0,
    },
    images: {
      type: String,
    },
    slug: {
      type: String,
    },
    groupSize: {
      type: Number,
      required: [true, 'Must have a group size'],
      maxlength: 3,
    },
    summary: {
      type: String,
      trim: true,
    },
    startDate: [Date],
    secretTour: {
      type: Boolean,
      default: false,
    },
    users1: [{ type: mongoose.Schema.ObjectId, ref: 'User' }], //referincing
    users2: [User], //embeding
  },

  { timestamps: true }
);

//  VIRTUAL FIELDS
//There are fields that are on our schema but no persist in our database

tourSchema.virtual('durationInWeeks').get(function () {
  return this.duration / 7;
});

//2. QUERY MIDDLEWARE
userSchema.pre('find', function (next) {
  //here this refers to the query object
  //Practical example is hidding certain tours from group of people or VIP Tours

  //$ne = not equal to
  this.find({ secretTour: { $ne: true } });
  next();
});

//POPULATE: Getting reference to the user on the tours
//With this implementation you can remove the populate from the route

tourSchema.pre(/^find/, function (next) {
  this.populate({
    path: 'users',
    select: '-_v -password',
  });
});

const Tour = mongoose.model('Tour', tourSchema);

export { Tour };
