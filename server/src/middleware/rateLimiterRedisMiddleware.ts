import Redis from 'ioredis';
import { RateLimiterRedis } from 'rate-limiter-flexible';
import { Request, Response, NextFunction } from 'express';
const redisClient = new Redis({ enableOfflineQueue: false });
const rateLimiter = new RateLimiterRedis({
  storeClient: redisClient,
  keyPrefix: 'middleware',
  points: 10, // 10 requests
  duration: 1, // per 1 second by userId
});

const rateLimiterMiddleware = (
  req: Request,
  res: Response,
  next: NextFunction,
): void => {
  rateLimiter
    .consume(req.ip)
    .then(
      (): void => {
        next();
      },
    )
    .catch(
      (): void => {
        res.status(429).send('Too Many Requests');
      },
    );
};
export default rateLimiterMiddleware;
