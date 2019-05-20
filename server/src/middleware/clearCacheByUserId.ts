import clearCache from '../services/cache';
import { Request, Response, NextFunction } from 'express';
const clearCacheByUserId = (
  req: Request,
  res: Response,
  next: NextFunction,
) => {
  const afterResponse = () => {
    res.removeListener('finish', afterResponse);
    //@ts-ignore
    if (res.statusCode < 400) clearCache(req.userId);
  };

  res.on('finish', afterResponse);
  next();
};
export default clearCacheByUserId;
