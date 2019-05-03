import { Request, Response, NextFunction } from 'express';
import { validationResult } from 'express-validator/check';
import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';
import isValidationErrorsEmpty from '../util/isValidationErrorsEmpty';
import ValidationError from '../classes/ValidationError';
import CustomError from '../classes/CustomError';
import ValidationErrorType from '../interfaces/ValidationErrorType';
import ExpenseType from '../interfaces/Expense';
import Expense from '../models/Expense';
export const addExpense = async (
  req: Request,
  res: Response,
  next: NextFunction,
): Promise<void> => {
  try {
    isValidationErrorsEmpty(validationResult(req));
    const { title, description, cost } = req.body;
    const { userId } = req;

    let expense;
    expense = new Expense({
      title,
      userId,
      description,
      cost,
    });
    await expense.save();
    res.status(201).json({});
  } catch (err) {
    if (!err.status) {
      err.status = 500;
    }
    next(err);
  }
};
