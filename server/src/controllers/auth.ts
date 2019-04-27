import { Request, Response, NextFunction } from 'express';
import { validationResult } from 'express-validator/check';
import bcrypt from 'bcryptjs';
import User from '../models/User';
import jwt from 'jsonwebtoken';
import isValidationErrorsEmpty from '../util/isValidationErrorsEmpty';
import ValidationError from '../classes/ValidationError';
import CustomError from '../classes/CustomError';
import ValidationErrorType from '../interfaces/ValidationErrorType';
import sendEmailConfirmation from '../services/sendEmailConfirmation';
import createUser from '../services/createUser';
import getUserById from '../services/getUserById';
import getUserByEmail from '../services/getUserByEmail';
import comparePassword from '../services/comparePassword';
import checkUserConfirmation from '../services/checkUserConfirmation';
import signLoginToken from '../services/signLoginToken';
export const signUp = async (
  req: Request,
  res: Response,
  next: NextFunction,
): Promise<void> => {
  try {
    isValidationErrorsEmpty(validationResult(req));
    const { email, username, password } = req.body;
    const { userId } = await createUser(email, username, password);
    sendEmailConfirmation(userId, email);
    res.status(200).json({ message: 'User created!' });
  } catch (err) {
    if (!err.status) {
      err.status = 500;
    }
    next(err);
  }
};

export const login = async (
  req: Request,
  res: Response,
  next: NextFunction,
): Promise<void> => {
  try {
    const { email, password } = req.body;
    const user = await getUserByEmail(email);
    comparePassword(password, user.password);
    checkUserConfirmation(user);
    const token = signLoginToken(user);
    const { username } = user;
    const userData = {
      email,
      username,
      userId: user._id.toString(),
    };
    res.status(200).json({ token, user: userData });
  } catch (err) {
    console.log(err);
    if (!err.statusCode) {
      err.statusCode = 500;
    }
    next(err);
  }
};
export const confirmEmail = async (
  req: Request,
  res: Response,
  next: NextFunction,
): Promise<void> => {
  try {
    const { token } = req.params;
    const emailSecret: any = process.env.EMAIL_SECRET;
    const { userId }: any = jwt.verify(
      token,
      emailSecret,
      (err: any, decoded: any) => {
        if (err) {
          throw new CustomError(err.message, 401);
        } else {
          return decoded;
        }
      },
    );
    const user = await getUserById(userId);
    await user.confirm();
    res.status(200).json({
      confirmed: true,
    });
  } catch (err) {
    if (!err.statusCode) {
      err.statusCode = 500;
    }
    next(err);
  }
};
export const requestEmailConfirmation = async (
  req: Request,
  res: Response,
  next: NextFunction,
): Promise<void> => {
  try {
    const { userId } = req.body;
    const user = await getUserById(userId);
    const { email } = user;
    sendEmailConfirmation(userId, email);
  } catch (err) {
    if (!err.statusCode) {
      err.statusCode = 500;
    }
    next(err);
  }
};
