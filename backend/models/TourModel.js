import mongoose from 'mongoose';

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
  },
  { timestamps: true }
);

const Tour = mongoose.model('Tour', tourSchema);

export { Tour };
