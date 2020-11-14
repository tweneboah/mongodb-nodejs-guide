import mongoose from 'mongoose';
import slugify from 'slugify';

const userSchema = new mongoose.Schema(
  {
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
    slug: String,
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

//==============
//VIRTUAL PROPERTIES
//====================

//toJSON and toObject are passed as a second argument to schema and this will allow the virtual property to be on the output

//NOTE: We cannot use virtuals in query

userSchema.virtual('fullName').get(function () {
  return this.name + this.password;
});

//====================
//DOCUMENT MIDDLEWARE
//======================

//There are four types of middleware in mongoose

//1. document
//2. query
//3.aggregate
//4. modelling

//Document middleware operates on current processing data
//runs before saving, it's not available in insertmany only save and create

userSchema.pre('save', function (next) {
  //we can hash a user password
  //we can also create slug
  this.slug = slugify(this.name, { lower: true });
  next();
});

//POST

userSchema.post('save', function (doc, next) {
  //Here we have the finished document
  console.log(doc);
  next();
});
const User = mongoose.model('User', userSchema);

export { User };
