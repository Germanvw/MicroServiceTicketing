import { json } from 'body-parser';
import express from 'express';
import mongoose from 'mongoose';
import 'express-async-errors';

import { CurrentUserRouter } from './routes/current-user';
import { SignInRouter } from './routes/signin';
import { SignOutRouter } from './routes/signout';
import { SignUpRouter } from './routes/signup';
import { errorHandler } from './middlewares/error-handler';
import { NotFoundError } from './errors/not-found-error';

const app = express();

app.use(json());

app.use(CurrentUserRouter);
app.use(SignInRouter);
app.use(SignOutRouter);
app.use(SignUpRouter);

app.all('*', (req, res) => {
  throw new NotFoundError();
});

app.use(errorHandler);

const PORT = process.env.PORT || 4001;

const start = async () => {
  try {
    await mongoose.connect('mongodb://auth-mongo-srv:27017/auth');
    console.log('Connected to MongoDB');
  } catch (err) {
    console.log(err);
  }
  app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
  });
};

start();
