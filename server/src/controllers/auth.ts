import { Request, Response, NextFunction } from 'express';
import { validationResult } from 'express-validator/check';
import bcrypt from 'bcryptjs';
import User from '../models/User';
import jwt from 'jsonwebtoken';
import validationErrorsIsEmpty from '../util/validationErrorsIsEmpty';
import ValidationError from '../classes/ValidationError';
import ValidationErrorType from '../interfaces/ValidationErrorType';

export const signUp = async (
  req: Request,
  res: Response,
  next: NextFunction,
): Promise<void> => {
  try {
    validationErrorsIsEmpty(validationResult(req));
    const { email, username, password } = req.body;
    const hashedPassword = await bcrypt.hash(password, 12);
    const user = new User({
      email,
      password: hashedPassword,
      username,
    });
    await user.save();
    res.status(200).json({ message: 'User created!' });
  } catch (err) {
    if (!err.statusCode) {
      err.statusCode = 500;
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
        status: 404,
      };
      const validationError = new ValidationError(validationErrorObj);
      throw validationError;
    }
    const passwordMatch = await bcrypt.compare(password, user.password);
    if (!passwordMatch) {
      const validationErrorObj: ValidationErrorType = {
        location: 'body',
        param: 'password',
        msg: 'Password does not match!',
        value: password,
        status: 403,
      };
      const validationError = new ValidationError(validationErrorObj);
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
    };
    res
      .status(200)
      .json({ token: token, userId: user._id.toString(), userData });
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
    const emailSecret: any = process.env.EMAIL_SECRET;
    const { userId }: any = jwt.verify(req.params.token, emailSecret);
  } catch (err) {
    if (!err.statusCode) {
      err.statusCode = 500;
    }
    next(err);
  }
};
