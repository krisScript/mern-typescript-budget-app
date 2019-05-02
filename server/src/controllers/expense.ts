import { Request, Response, NextFunction } from 'express';
import { validationResult } from 'express-validator/check';
import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';
import isValidationErrorsEmpty from '../util/isValidationErrorsEmpty';
import ValidationError from '../classes/ValidationError';
import CustomError from '../classes/CustomError';
import ValidationErrorType from '../interfaces/ValidationErrorType';
export const signUp = async (
  req: Request,
  res: Response,
  next: NextFunction,
): Promise<void> => {
  try {

    res.status(200).json({ message: 'User created!' });
  } catch (err) {
    if (!err.status) {
      err.status = 500;
    }
    next(err);
  }
};
