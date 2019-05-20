import express from 'express';
import { Request, Response, NextFunction } from 'express';
import bodyParser from 'body-parser';
import mongoose, { Error } from 'mongoose';
import authRoutes from './routes/auth';
import expenseRoutes from './routes/expense';
import helmet from 'helmet';
import rateLimiterRedisMiddleware from './middleware/rateLimiterRedisMiddleware';
import cache from './services/cache';
const app = express();

app.use(helmet());
// app.use(rateLimiterRedisMiddleware);
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
app.use(expenseRoutes);

app.use(
  (error: any, req: Request, res: Response, next: NextFunction): void => {
    const status = error.status || 500;
    console.log(error);
    if (error.data) {
      const { data } = error;
      res.status(status).json({ data });
    } else {
      const { msg } = error;
      res.status(status).json({ msg });
    }
  },
);
export default app;
