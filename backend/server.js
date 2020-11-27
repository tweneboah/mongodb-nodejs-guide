import express from 'express';
import { dbConnect } from './config/dbConnect';
import {
  errorHandlerMiddleware,
  notFound,
} from './middlewares/errorHandlerMiddleware';
import { User } from './models/UserModel';
import { postRouter } from './routes/postRoutes/postRoutes';
import { usersRoutes } from './routes/usersRoute/usersRoutes';
import { queryingWithDateRoute } from './routes/postRoutes/queryingWithDateRoute';
dbConnect();
const app = express();
app.use(express.json());

//Routes
app.use('/api/posts', postRouter);
app.use('/api/users', usersRoutes);

app.use('/api/episodes', queryingWithDateRoute);

app.use(notFound);
app.use(errorHandlerMiddleware);

app.listen(5000, () => console.log('server'));
