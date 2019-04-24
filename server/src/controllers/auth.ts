import { Request, Response, NextFunction } from 'express';
import { validationResult } from 'express-validator/check';
import bcrypt from 'bcryptjs';
import User from '../models/User';
import jwt from 'jsonwebtoken';
import isValidationErrorsEmpty from '../util/isValidationErrorsEmpty';
import ValidationError from '../classes/ValidationError';
import ValidationErrorType from '../interfaces/ValidationErrorType';
import MailOptions from '../interfaces/MailOptions';
import sendEmail from '../util/sendEmail';
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
    const emailSecret: any = process.env.EMAIL_SECRET;
    const token = jwt.sign(
      {
        email,
        username,
      },
      emailSecret,
      { expiresIn: '1h' },
    );
    const appEmail: any = process.env.EMAIL;
    const url = `http://localhost:8080/auth/cofirmation/${token}`;
    const mailOptions: MailOptions = {
      from: appEmail,
      to: email,
      subject: 'Email confirmation.',
      html: `Please click this email to confirm your email: <a href="${url}">${url}</a>`,
    };
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
