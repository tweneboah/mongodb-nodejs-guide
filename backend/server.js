import express from 'express';
import { dbConnect } from './config/dbConnect';
import { User } from './models/UserModel';

dbConnect();
const app = express();
app.use(express.json());

//CREATE
app.post('/api/users/register', async (req, res) => {
  console.log('post');
  try {
    const userCreated = await User.create(req.body);
    res.send(userCreated);
  } catch (error) {
    res.send(error);
  }
});

//=======QUERIES======

//1. Find the number of times data occures

app.get('/api/users/count', async (req, res) => {
  try {
    const countQuery = await User.find({ name: 'Ben' }).countDocuments();

    res.json(countQuery);
  } catch (error) {
    res.send(error);
  }
});

//FETCH ALLL

app.get('/api/users', async (req, res) => {
  //req.query
  //api/tours?duration=5&difficulty=easy
  try {
    // const users = await User.find({});

    //two ways of filtering

    //1.
    // const users1 = await User.find({
    //   duration: 5, //req.body.duration
    //   difficulty: 'easy',
    // });

    //api/tours?duration=5&difficulty=easy
    const users = await User.find(req.query).sort('asc');

    //2

    const users4 = await User.find({})
      .where('duration')
      .equals(5)
      .where('difficult')
      .equals('easy');

    res.json(users);
  } catch (error) {
    res.send(error);
  }
});

//User.where('age').gte(21).lte(65).exec(callback);
//gte = greater than or equal to

app.get('/api/users/age', async (req, res) => {
  try {
    const greaterThan = await User.find({}).where('age').gt(10).exec();
    res.send(greaterThan);
  } catch (error) {}
});

//Delete

//deleteOne does not return the deleted data but instead returns count

// const deletedUser = await User.deleteOne({ _id: req.params.id });

//findByIdAndDelete and findByIdAndRemove  returns the deleted data
//const deletedUser = await User.findByIdAndDelete({ _id: req.params.id });
//const deletedUser = await User.findByIdAndRemove({ _id: req.params.id });

app.post('/api/users/:id', async (req, res) => {
  try {
    const deletedUser = await User.findByIdAndRemove({ _id: req.params.id });
    res.send(deletedUser);
  } catch (error) {}
});

//update

app.post('/api/users/update/:id', async (req, res) => {
  console.log('update');
  try {
    const updated = await User.findByIdAndUpdate(
      req.params.id,
      { name: req.body.name },
      {
        runValidators: true,
        new: true,
      }
    );
    res.send(updated);
  } catch (error) {}
});

//TOURS
app.get('/api/tours', async (req, res) => {
  // req.query
  try {
  } catch (error) {}
});

app.listen(5000, () => console.log('server'));
