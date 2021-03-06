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
import Redis from 'ioredis';
import { expression } from '@babel/template';
export const addExpense = async (
  req: Request,
  res: Response,
  next: NextFunction,
): Promise<void> => {
  try {
    isValidationErrorsEmpty(validationResult(req));
    const { title, description, cost } = req.body;
    const { userId } = req;
    console.log('post');
    console.log(title, description, userId);
    const expense = new Expense({
      title,
      userId,
      description,
      cost: Number(cost),
    });
    await expense.save();
    res.status(201).json({ expenseId: expense._id });
  } catch (err) {
    console.log(err);
    if (!err.status) {
      err.status = 500;
    }
    next(err);
  }
};

export const deleteExpense = async (
  req: Request,
  res: Response,
  next: NextFunction,
): Promise<void> => {
  try {
    const { expenseId } = req.params;
    const { userId } = req;
    const expense = await Expense.findById(expenseId);
    if (!expense) {
      throw '';
    }
    if (expense.userId.toString() === userId) {
      expense.remove();
    }
    res.status(200).json({ msg: 'Expense Deleted' });
  } catch (err) {
    if (!err.status) {
      err.status = 500;
    }
    next(err);
  }
};

export const editExpense = async (
  req: Request,
  res: Response,
  next: NextFunction,
): Promise<void> => {
  try {
    console.log('put');
    isValidationErrorsEmpty(validationResult(req));
    const { title, description, cost } = req.body;
    const { expenseId } = req.params;
    const expense = {
      title,
      description,
      cost,
    };
    await Expense.findOneAndUpdate({ _id: expenseId }, expense);
    res.status(201).json({ msg: 'updated' });
  } catch (err) {
    next(err);
    console.log(err);
  }
};

export const getExpenses = async (
  req: Request,
  res: Response,
  next: NextFunction,
): Promise<void> => {
  try {
    isValidationErrorsEmpty(validationResult(req));
    const { userId } = req;
    //@ts-ignore
    const expenses = await Expense.find({ userId }).cache({ key: userId });
    res.status(200).json({ expenses });
  } catch (err) {
    next(err);
    console.log(err);
  }
};
