import { verify } from 'jsonwebtoken';
import { Request, Response, NextFunction } from 'express';
import AuthenticatedRequest from '../interfaces/AuthenticatedRequest';
import DecodedToken from '../interfaces/DecodedToken';
const secret: any = process.env.SECRET;
const isAuth = (
  req: AuthenticatedRequest,
  res: Response,
  next: NextFunction,
): void => {
  const authHeader = req.get('Authorization');
  if (!authHeader) {
    const error = new Error('Not authenticated.');
    throw error;
  }
  const token = authHeader.split(' ')[1];
  let decodedToken: any;
  try {
    decodedToken = verify(token, secret);
  } catch (err) {
    err.statusCode = 500;
    throw err;
  }
  if (!decodedToken) {
    const error = new Error('Not authenticated.');
    // error.statusCode = 401;
    throw error;
  }
  req.userId = decodedToken.userId;
  next();
};
export default isAuth;
