import { Request, Response, NextFunction } from 'express';
import { validationResult } from 'express-validator/check';
import bcrypt from 'bcryptjs';
import User from '../models/User';
import jwt, { JsonWebTokenError } from 'jsonwebtoken';
import isValidationErrorsEmpty from '../util/isValidationErrorsEmpty';
import ValidationError from '../classes/ValidationError';
import ValidationErrorType from '../interfaces/ValidationErrorType';
import NotFoundError from '../classes/NotFoundError';
import MailOptions from '../interfaces/MailOptions';
import sendEmail from '../util/sendEmail';
import sendEmailConfirmation from '../util/sendEmailConfirmation';
export const signUp = async (
  req: Request,
  res: Response,
  next: NextFunction,
): Promise<void> => {
  try {
    isValidationErrorsEmpty(validationResult(req));
    const { email, username, password } = req.body;
    const hashedPassword = await bcrypt.hash(password, 12);
    const user = new User({
      email,
      password: hashedPassword,
      username,
    });
    const userId = user._id.toString();
    sendEmailConfirmation(userId, email);
    await user.save();
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
    const secret: any = process.env.SECRET;
    const { email, password } = req.body;
    const user = await User.findOne({ email });
    if (!user) {
      const validationErrorObj: ValidationErrorType = {
        location: 'body',
        param: 'email',
        msg: 'User with this email does not exist!',
        value: email,
      };
      const validationError = new ValidationError([validationErrorObj], 404);
      throw validationError;
    }
    const passwordMatch = await bcrypt.compare(password, user.password);
    if (!passwordMatch) {
      const validationErrorObj: ValidationErrorType = {
        location: 'body',
        param: 'password',
        msg: 'Password does not match!',
        value: password,
      };
      const validationError = new ValidationError([validationErrorObj], 403);
      throw validationError;
    }
    if (!user.confirmed) {
      const validationErrorObj: ValidationErrorType = {
        location: 'body',
        param: '',
        msg: 'Please confirm your email!',
        value: '',
      };
      const validationError = new ValidationError([validationErrorObj], 403);
      throw validationError;
    }
    const token = jwt.sign(
      {
        email: user.email,
        userId: user._id.toString(),
      },
      secret,
      { expiresIn: '1h' },
    );
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
          throw new Error(err.message);
        } else {
          return decoded;
        }
      },
    );
    const user = await User.findById(userId);
    console.log(user);
    if (!user) {
      const error = new NotFoundError('User not found!', 404);
      throw error;
    }
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
    const { userId, email } = req.body;
    sendEmailConfirmation(userId, email);
  } catch (err) {
    if (!err.statusCode) {
      err.statusCode = 500;
    }
    next(err);
  }
};
