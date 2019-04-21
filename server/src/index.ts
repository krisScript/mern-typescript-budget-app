import express from 'express';
import { Request, Response, NextFunction } from 'express';
import bodyParser from 'body-parser';
import mongoose, { Error } from 'mongoose';
import authRoutes from './routes/auth';
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
  app.use(
    (error: Error, req: Request, res: Response, next: NextFunction): void => {
      console.log(error);
      //   res.status(status).json({ data: data });
    },
  ),
  app.use('/auth', authRoutes);
mongoose
  .connect(mongoURI, { useNewUrlParser: true })
  .then(result => {
    app.listen(7080);
  })
  .catch(err => console.log(err));
