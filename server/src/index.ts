import express from 'express';
import { Request, Response, NextFunction } from 'express';
import bodyParser from 'body-parser';
import mongoose, { Error } from 'mongoose';
import authRoutes from './routes/auth';
import ValidationError from './classes/ValidationError';
import ValiadtionErrorType from './interfaces/ValidationErrorType';
const app = express();

const mongoURI: string = `mongodb+srv://${process.env.MONGO_USER}:${
  process.env.MONGO_PASSWORD
}@cluster0-zmcyw.mongodb.net/${process.env.MONGO_DATABASE}?retryWrites=true`;

app.use(bodyParser.json()),
  app.use(
    (req: Request, res: Response, next: NextFunction): void => {
      res.setHeader('Access-Control-Allow-Origin', '*');
      res.setHeader(
        'Access-Control-Allow-Methods',
        'OPTIONS, GET, POST, PUT, PATCH, DELETE',
      );
      res.setHeader(
        'Access-Control-Allow-Headers',
        'Content-Type, Authorization',
      );
      next();
    },
  ),
  app.use('/auth', authRoutes);

app.use(
  (error: any, req: Request, res: Response, next: NextFunction): void => {
    const status = error.status || 500;
    if (error.data) {
      const { data } = error;
      res.status(status).json({ data });
    } else {
      const { msg } = error;
      res.status(status).json({ msg });
    }
  },
),
  mongoose
    .connect(mongoURI, { useNewUrlParser: true })
    .then(result => {
      app.listen(8080);
    })
    .catch(err => console.log(err));
